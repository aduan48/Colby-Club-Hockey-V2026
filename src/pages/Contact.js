import '../styles/Contact.css';
import { useState, useEffect} from 'react';

/**
 * 
 * @returns The contact me form
 */
function Contact() {

    /**
     * 
     * @param key the section of the form
     * @param initialState what is initialy set there
     * @returns 
     */
    const useStorageState = (key, initialState) => {

        const [value, setValue] = useState(localStorage.getItem(key) || initialState); //stores the values to the specific key

        //whene ever a value i changed, the response is stored in localStorage
        useEffect(()=>{
            localStorage.setItem(key, value);
        }, [key, value]);
        return ([value, setValue]);
    }


    const [name, setName] = useStorageState('name',''); //sets up the name key
    const handleName = (event) => { 
        setName(event.target.value);

    }/*when text is changed the name is changed*/

    const [email, setEmail] = useStorageState('email','');//sets up the email key
    const handleEmail = (event) => {
        setEmail(event.target.value);

    }/*when text is changed the emil is changed*/
    
    const [message, setMessage] = useStorageState('message',''); //sets up the messgae key
    const handleMessage = (event) => {
        setMessage(event.target.value);
    }/*when text is changed the message is changed*/


    //encodes the data so that it can be sent and processed by netlify
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