import React from 'react';

const Testimonial = () => {
    const testimonials = [
        {
            quote: "This platform has truly transformed the way we work. Their attention to detail and customer service is unmatched.",
            name: "Guru",
            position: "CEO, Company Inc.",
            image: "https://i.pinimg.com/474x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg",
        },
        {
            quote: "The ease of use and reliability of the services provided has been outstanding. Highly recommend!",
            name: "Nithya",
            position: "CTO, Tech Solutions",
            image: "https://i.pinimg.com/474x/95/26/12/95261256b08293c3b2d897a1f5cd9d13.jpg",
        },
        {
            quote: "Fantastic customer support and the user interface is intuitive and simple. Great experience!",
            name: "Kavin",
            position: "Marketing Manager, Creative Co.",
            image: "https://i.pinimg.com/474x/bf/b6/d2/bfb6d21bf95188cdc380d0261876dede.jpg",
        }
    ];

    return (
        <section className="py-10 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">What Our Clients Say</h2>
                <div className="flex flex-wrap lg:flex-nowrap justify-center gap-6">
                    {testimonials.map((item, index) => {
                        const {quote,name,position,image}=item;
                        return (
                        
                            <div key={index} className="bg-white shadow-lg rounded-lg p-6 w-full lg:w-1/3">
                                <div className="flex items-center space-x-4 mb-4">
                                    <img className="w-12 h-12 rounded-full object-cover" src={image} alt={name} />
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-700">{name}</h3>
                                        <p className="text-sm text-gray-500">{position}</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 italic">"{quote}"</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
};

export default Testimonial;
