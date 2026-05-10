import '../styles/Contact.css';
import { useState, useEffect} from 'react';
function Contact() {
    //saves info for contact us form if user refreshes page
    const useStorageState = (key, initialState) => {
        const [value, setValue] = useState(localStorage.getItem(key) || initialState);
        useEffect(()=>{
            localStorage.setItem(key, value);
        }, [key, value]);
        return ([value, setValue]);
    }
    const [name, setName] = useStorageState('name','');
    const handleName = (event) => {
        setName(event.target.value);

    }
    const [email, setEmail] = useStorageState('email','');
    const handleEmail = (event) => {
        setEmail(event.target.value);

    }
    const [message, setMessage] = useStorageState('message','');
    const handleMessage = (event) => {
        setMessage(event.target.value);
    }
    const encode = (data) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
        }
    // Submit form to Netlify
    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({ "form-name": "contact", name, email, message})
        })
            .then(() => alert("Thanks for contacting us! We'll get back to you within 48 hours."))
            .catch(error => alert(error));

    };
    return (
        <div className='contact-us' id='Contact Us'>
            <header className="section-header">Contact Us</header>
            <p className="contact-us-description">Are you a prospective student? Have a question? Want to send feedback about the website? Let us know.</p>
            <form method="POST" name='contact' data-netlify="true" onSubmit={handleSubmit}>
                {/* hidden input for Netlify to process submissions */}
                <input type="hidden" name="form-name" value="contact" />
                <label htmlFor='name'>Name</label>
                <input type="text" id='name' name="name" placeholder="Brian" value={name} onChange={handleName} required />
                <label htmlFor='email'>Your email</label>
                <input type='email' id='email' name="email" placeholder="gomules@gmail.com" value={email} onChange={handleEmail} required />
                <label htmlFor='message'>Your message</label>
                <textarea id='message' rows="10" columns="30" name="message" placeholder="Leave a comment" value={message} onChange={handleMessage} required></textarea>
                <button type="submit">Submit</button> 
            </form>
        </div>
    )
}

export default Contact;