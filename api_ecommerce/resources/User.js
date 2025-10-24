export default { 
    user_list: (user) => {
        return {
            _id: user._id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            avatar: user.avatar,
        }
    },
    user_emails: (user) => {
        return {
            _id: user._id,
            email: user.email
        }
    }
}