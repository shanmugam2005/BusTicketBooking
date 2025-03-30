import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

import { useMutation,gql } from '@apollo/client';

const stripePromise = loadStripe('pk_test_51QqbKs09NdYMojoa1f58Zk930EY4JJWHf3hXRbQHsIDrYFHXIg9LxTwsWgv9eKlYCP5HNH1NuvfmU6YDOmDSb1Ha00pcN0O0hX'); // Use your Stripe public key

const BOOK_TICKET = gql`
  mutation BookTicket($ticketInput: ticketInput!) {
    bookTicket(ticketInput: $ticketInput) {
      from
      to
      clientSecret
    }
  }
`;
const Form: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        from: '',
        to: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [bookTicket] = useMutation(BOOK_TICKET);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { data ,errors} = await bookTicket({
                variables: { ticketInput: formData }
            });
            if(errors){
                console.log(errors);
                return
            }
            console.log(data)
            const { clientSecret } = data.bookTicket;
           const stripe = await stripePromise;
            if (stripe&&clientSecret) {
                const result = await stripe.redirectToCheckout({
                    sessionId: clientSecret,
                });
                if (result.error) {
                    setError(result.error.message || 'Error occurred during payment');
                }
                console.log("Success")
            } else {
                setError('Stripe.js failed to load');
            }
        } catch (err) {
            setError('Error occurred during form submission');
            console.log("err",err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="from">From:</label>
                <input
                    type="text"
                    id="from"
                    name="from"
                    value={formData.from}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="to">To:</label>
                <input
                    type="text"
                    id="to"
                    name="to"
                    value={formData.to}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit" disabled={loading}>
                {loading ? 'Processing...' : 'Submit'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default Form;
