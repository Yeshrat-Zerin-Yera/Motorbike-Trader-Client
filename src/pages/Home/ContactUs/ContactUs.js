import React, { useState } from 'react';
import ContactUsImg from '../../../assets/images/contact-us.png';

const ContactUs = () => {
    // Set Subject
    const [subject, setSubject] = useState('')
    // Set Message
    const [message, setMessage] = useState('');

    const handleGetMailDetails = event => {
        const form = event.target;
        if (form.name === 'subject') {
            setSubject(form.value);
        }
        setMessage(form.value);
    };

    return (
        // Form
        < form onChange={handleGetMailDetails} method="post" action={`mailto:yeshratzerinyera@gmail.com?subject=${subject}&body=${message}`
        } className='flex items-center flex-col gap-3 p-6 mt-12' style={{ backgroundImage: `url(${ContactUsImg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            {/* Contact Us Title */}
            < h4 className="text-2xl font-bold text-center text-white" >Contact Us</h4 >
            {/* Subject */}
            < input type="text" name='subject' placeholder="Subject" className="input input-bordered w-full max-w-xs" />
            {/* Message */}
            < textarea className="textarea input-bordered w-full max-w-xs text-[16px]" name='message' placeholder="Message" ></textarea >
            {/* Submit Button */}
            < button className="btn border-0 bg-gradient-to-r from-cyan-400 to-blue-500 w-full max-w-xs" > Send</button >
            {/* Reset Button */}
            < button type='reset' className="btn btn-outline border-2 border-blue-500 text-blue-500 w-full max-w-xs" > Reset</button >
        </form >
    );
};

export default ContactUs;