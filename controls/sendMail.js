const Mailer = require('../utils/mail');

const sendmail = async (req, res) => {
    try {
        const { name, mobile, email, message } = req.body;

        // Check if required fields are present and validate email and mobile
        if (!name || !email || !message || !mobile || !validateEmail(email) || !validateMobile(mobile)) {
            return res.status(400).json({ error: 'Invalid or incomplete user details' });
        }

        let from = email;
        let subject = 'Client Request';
        let text = `
            Hello,

            You have received a new inquiry from a user. Here are the details:

            Name: ${name}
            Email: ${email}
            Mobile: ${mobile}
            Message: ${message}

            Please respond to the user at their provided email address.

            Best regards,
            Mark Softline`;

        Mailer(text, email, subject)
            .then((emailSent) => {
                if (emailSent) {
                    return res.status(200).json({ success: 'Email sent successfully' });
                } else {
                    return res.status(500).json({ error: 'Failed to send email' });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                return res.status(500).json({ error: 'Internal server error' });
            });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};


const validateMobile = (mobile) => {
    const re = /^[0-9]{10}$/;
    return re.test(mobile);
};

module.exports = sendmail;
