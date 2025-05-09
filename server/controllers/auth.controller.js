    import User from '../model.js';
    import UserBookmark from '../bookmarkmodel.js';
    import Discussion from "../discussionmodel.js";
    import bcrypt from 'bcrypt';
    import mongoose from 'mongoose';
    import dotenv from 'dotenv';
    import cloudinary from "../lib/cloudinary.js"; // ensure this is properly imported
    import { gentoken } from '../lib/utils.js';
    dotenv.config();
    // LOGIN FUNCTION WITH COOKIE
    export const login = async (req, res) => {
        try {
          const { email, password } = req.body;
      
          // Find user
          const user = await User.findOne({ email });
          if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
          }
      
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
          }
      
          // Set cookie
          gentoken(user._id, res);
          res.status(200).json({
            user: {
              name: user.name,
              email: user.email,
              phone: user.phone,
              gender: user.gender,
              age: user.age,
              photo: user.photo
            }
          });
      
        } catch (error) {
          console.error('Login error:', error);
          res.status(500).json({ message: 'Error logging in', error: error.message });
        }
      };
      

    // SIGNUP FUNCTION WITH COOKIE
    export const signup = async (req, res) => {
        const { name, email, phone, password, gender, age, selectedImg } = req.body;
        
        try {
            // Validate required fields
            if (!name || !email || !password) {
                return res.status(400).json({ message: 'Name, email, and password are required' });
            }

            // Validate password length
            if (password.length < 6) {
                return res.status(400).json({ message: 'Password should be at least 6 characters' });
            }

            // Validate email format (basic check)
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                return res.status(400).json({ message: 'Invalid email format' });
            }

            // Check for existing user
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(409).json({ message: 'Email already in use' });
            }

            // Upload image to Cloudinary if provided
            let photoUrl = '';
            if (selectedImg) {
                try {
                    const uploadRes = await cloudinary.uploader.upload(selectedImg);
                    photoUrl = uploadRes.secure_url;
                } catch (uploadError) {
                    console.error("Image upload error:", uploadError);
                    return res.status(400).json({ message: 'Error uploading profile image' });
                }
            }

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create new user
            const newUser = await User.create({
                name,
                email,
                password: hashedPassword,
                phone: phone || null,  // Set to null if not provided
                gender: gender || null,
                age,
                photo: photoUrl || null
            });

            // Generate token
            gentoken(newUser._id, res);

            // Return success response
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                photo: newUser.photo
            });

        } catch (error) {
            console.error("Signup error:", error);
            
            // Handle Mongoose validation errors separately
            if (error.name === 'ValidationError') {
                const errors = Object.values(error.errors).map(err => err.message);
                return res.status(400).json({ 
                    message: 'Validation error',
                    errors 
                });
            }

            res.status(500).json({ 
                message: 'Internal server error during signup',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    };

    export const logout = async(req,res)=>{
        try{
            res.cookie("jwt","",{
                maxAge:0,
            })
            res.status(200).json({message:'logged out user'});
        }
        catch(error){
            res.status(500).json({message:"internal server error"});
        }
    }

    export const checkAuth = async(req,res)=>{
        try{
            res.status(200).json(req.user);
        }
        catch{
            res.status(500).json({message:"intenal server error"});
        }
    };


    export const bookmark = async (req, res) => {
        try {
            const { email, schoolName, schoolAddress } = req.body;
            // Validate input
            if (!email || !schoolName || !schoolAddress) {
                return res.status(400).json({
                    success: false,
                    message: 'Email, school name, and school address are required'
                });
            }

            // Check if user exists
            const existingUser = await UserBookmark.findOne({ email });

            if (existingUser) {
                // Check if school is already bookmarked
                const isAlreadyBookmarked = existingUser.bookmarkedSchools.some(
                    school => school.schoolName === schoolName && school.schoolAddress === schoolAddress
                );

                if (isAlreadyBookmarked) {
                    return res.status(200).json({
                        success: false,
                        message: 'This school is already bookmarked'
                    });
                }

                // Add new bookmark
                existingUser.bookmarkedSchools.push({ schoolName, schoolAddress });
                await existingUser.save();

                return res.status(200).json({
                    success: true,
                    message: 'School added to bookmarks',
                    data: existingUser
                });
            } else {
                // Create new user with bookmark
                const newUserBookmark = new UserBookmark({
                    email,
                    bookmarkedSchools: [{ schoolName, schoolAddress }]
                });

                await newUserBookmark.save();

                return res.status(201).json({
                    success: true,
                    message: 'New user created with school bookmark',
                    data: newUserBookmark
                });
            }
        } catch (error) {
            console.error('Error in bookmark function:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            });
        }
    };

    export const fetchbookmarks = async (req, res) => {
        try {
            // Get email from query parameters instead of body for GET request
            const { email } = req.query;

            // Validate input
            if (!email) {
                return res.status(400).json({
                    success: false,
                    message: 'Email is required to fetch bookmarks'
                });
            }

            // Find user by email
            const user = await UserBookmark.findOne({ email });

            if (!user) {
                return res.status(200).json({  // Changed to 200 since empty bookmarks isn't an error
                    success: true,
                    message: 'No bookmarks found for this user',
                    bookmarks: []
                });
            }

            // Return the bookmarked schools
            return res.status(200).json({
                success: true,
                message: 'Bookmarks retrieved successfully',
                bookmarks: user.bookmarkedSchools
            });

        } catch (error) {
            console.error('Error fetching bookmarks:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error while fetching bookmarks',
                error: error.message
            });
        }
    };

    // Add this to your useAuthStore actions
    export const deletebookmark = async (req, res) => {
        try {
            const { email, schoolName, schoolAddress } = req.body;
            
            if (!email || !schoolName || !schoolAddress) {
                return res.status(400).json({
                    success: false,
                    message: 'Email, school name, and school address are required'
                });
            }

            const userBookmark = await UserBookmark.findOne({ email });
            if (!userBookmark) {
                return res.status(404).json({
                    success: false,
                    message: 'No bookmarks found for this user'
                });
            }

            const initialCount = userBookmark.bookmarkedSchools.length;
            userBookmark.bookmarkedSchools = userBookmark.bookmarkedSchools.filter(
                school => !(school.schoolName === schoolName && 
                        school.schoolAddress === schoolAddress)
            );

            if (initialCount === userBookmark.bookmarkedSchools.length) {
                return res.status(404).json({
                    success: false,
                    message: 'Bookmark not found'
                });
            }

            await userBookmark.save();
            return res.status(200).json({
                success: true,
                message: 'Bookmark removed successfully',
                data: userBookmark.bookmarkedSchools
            });

        } catch (error) {
            console.error('Delete bookmark error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            });
        }
    };
    // GET all discussions with comments
    // Add Discussion
    export const adddicussion = async (req, res) => {
        try {
        const { email, content } = req.body;
    
        // Validate input
        if (!email || !content) {
            return res.status(400).json({ 
            success: false,
            message: 'User email and content are required' 
            });
        }
    
        // Create or update discussion - use userEmail to match schema
        const discussion = await Discussion.findOneAndUpdate(
            { userEmail: email }, // Changed from {email} to {userEmail: email}
            {
            $push: {
                reviews: {
                content
                // timePosted will be auto-added
                }
            }
            },
            { 
            upsert: true, 
            new: true,
            setDefaultsOnInsert: true 
            }
        );
    
        res.status(201).json({
            success: true,
            message: 'Discussion added successfully',
            data: discussion
        });
    
        } catch (error) {
        console.error('Error adding discussion:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to add discussion',
            error: error.message
        });
        }
    };
    
    // Fetch Discussions
    export const fetchDiscussion = async (req, res) => {
        try {
        const discussions = await Discussion.aggregate([
            {
            $unwind: "$reviews" // Break down each review into separate documents
            },
            {
            $sort: { "reviews.timePosted": -1 } // Sort by review time (newest first)
            },
            {
            $group: {
                _id: "$_id",
                userEmail: { $first: "$userEmail" },
                createdAt: { $first: "$createdAt" },
                updatedAt: { $first: "$updatedAt" },
                reviews: { $push: "$reviews" } // Rebuild the reviews array
            }
            },
            {
            $sort: { "reviews.timePosted": -1 } // Final sort
            }
        ]);
    
        res.status(200).json({
            success: true,
            message: 'All discussions fetched successfully',
            data: discussions || []
        });
    
        } catch (error) {
        console.error('Error fetching discussions:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch discussions',
            error: error.message
        });
        }
    };

// controllers/auth.controller.js
export const deleteDiscussion = async (req, res) => {
    try {
      const { userEmail, reviewId } = req.body;
  
      // Validate input
      if (!userEmail || !reviewId) {
        return res.status(400).json({
          success: false,
          message: 'Both userEmail and reviewId are required in request body'
        });
      }
  
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userEmail)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid email format'
        });
      }
  
      // Validate reviewId format
      if (!mongoose.Types.ObjectId.isValid(reviewId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid review ID format'
        });
      }
  
      // Convert to ObjectId
      const objectIdReviewId = new mongoose.Types.ObjectId(reviewId);
  
      // Delete the review
      const result = await Discussion.findOneAndUpdate(
        { 
          userEmail: userEmail.toLowerCase(), // Ensure case-insensitive match
          'reviews._id': objectIdReviewId 
        },
        { $pull: { reviews: { _id: objectIdReviewId } } },
        { new: true }
      );
  
      if (!result) {
        return res.status(404).json({
          success: false,
          message: 'Review not found or not owned by user'
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Review deleted successfully',
        deletedReviewId: reviewId,
        remainingReviews: result.reviews.length
      });
  
    } catch (error) {
      console.error('Error deleting discussion:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete review',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  };