const mongoose = require('mongoose') 

mongoose.connect('mongodb+srv://msdiwahar5:msdiwahar5@cluster0.sfskd.mongodb.net/')
 .then(() => console.log('Database connected successfully'))
 .catch(err=> console.log(err));


 const userSchema = new mongoose.Schema({
    name: String, 
    email: String, 
    age: Number,
    isActive: Boolean,
    tags: [String] ,
    createdAt: {type:Date, default: Date.now()}
 })

 // user model 
 const User = mongoose.model('User', userSchema)

 async function runQueryExample(){
    try{
        // creating a new document 
        const newUser =await User.create({
            name: 'john', 
            email: 'john@gmail.com', 
            age: 24,
            isActive: true,
            tags: ['Developer'] ,
        })

        console.log("Created new User", newUser) 
        // get all
        const allUsers = await User.find({}); 
        console.log(allUsers)
        // getUserOfActiveFalse 
        const getUserOfActiveFalse = await User.find({isActive:false})
        console.log(getUserOfActiveFalse)
        // findOne method returns 1st matching document.
        // last created user 
        const getLastCreatedUserByUserId = await User.findById(newUser._id) 
        console.log(getLastCreatedUserByUserId)
        // get selected fields 
        const selectedFields = await User.find().select('name email -id');
        console.log(selectedFields)
        // getting first 5 users, in that skippig 1st 2 users; 
        const limitedUsers = await User.find().limit(5).skip(1)
        console.log(limitedUsers)
        // sorting persons with age in descending orders 
        const soredUsers  =await User.find().sort({age: -1})
        console.log(soredUsers)
        // count doc where isActive is true 
        const countDocuments = await User.countDocuments({isActive: false})
        console.log(countDocuments)
        // deleting user with Id 
        const deleteUser = await User.findByIdAndDelete(newUser._id);
        // updating user 
        const updateUser = await User.findByIdAndUpdate(newUser._id, {
            $set: {age: 100}, 
            $push: {tags: 'updated'}
        }, {new: true})
        console.log(updateUser)


    }catch(e){
        console.log(e)
    }finally{
        await mongoose.connection.close()
    }
 }

 runQueryExample()
