import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
    {
        id: 'm1',
        title: 'This is the first meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg',
        address: 'Meetupstreet 5, 12345 Meetup City',
        description: 'This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!',
    },
    {
        id: 'm2',
        title: 'Tech Talk: Future of AI',
        image: 'https://www.xenonstack.com/hs-fs/hubfs/generative-ai-services.png?width=1156&height=481&name=generative-ai-services.png',
        address: 'Innovation Hub, 67890 Silicon Valley',
        description: 'Join us for an exciting talk on the future of artificial intelligence and machine learning.',
    },
    {
        id: 'm3',
        title: 'Nature Walk & Talk',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1350&q=80',
        address: 'Greenway Trail, 55555 Nature Park',
        description: 'Enjoy a relaxing walk through nature while networking with like-minded people.',
    },
    {
        id: 'm4',
        title: 'Startup Pitch Night',
        image: 'https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1350&q=80',
        address: 'CoWork Central, 10101 Startup Blvd',
        description: 'Watch local startups pitch their ideas and connect with investors and innovators.',
    },
    {
        id: 'm5',
        title: 'Coffee & Code',
        image: 'https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?auto=format&fit=crop&w=1350&q=80',
        address: 'Brewed Awakenings Café, 22222 Dev City',
        description: 'Meet other developers over coffee and build something awesome together.',
    },
    {
        id: 'm6',
        title: 'UX Design Workshop',
        image: 'https://buildfire.com/wp-content/uploads/2021/10/Whats-the-Difference-Between-UX-Design-vs.-UI-Design_@3x-1-scaled.jpg',
        address: 'Design Hall, 33333 Creativity Drive',
        description: 'Hands-on workshop to improve your user experience design skills.',
    },
    {
        id: 'm7',
        title: 'Blockchain & Crypto 101',
        image: 'https://images.unsplash.com/photo-1620207418302-439b387441b0?auto=format&fit=crop&w=1350&q=80',
        address: 'Blockchain Hub, 44444 Token Lane',
        description: 'Learn the basics of blockchain technology and how to invest in crypto safely.',
    },
    {
        id: 'm8',
        title: 'Photography Walk',
        image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1350&q=80',
        address: 'City Square, 55555 Viewpoint Ave',
        description: 'Grab your camera and join fellow photo enthusiasts for a scenic walk around the city.',
    },
    {
        id: 'm9',
        title: 'Book Club: Sci-Fi Edition',
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1350&q=80',
        address: 'Library Lounge, 66666 Reading Rd',
        description: 'Discuss your favorite sci-fi books with other bookworms and discover new reads.',
    },
    {
        id: 'm10',
        title: 'Fitness Bootcamp Meetup',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1350&q=80',
        address: 'Open Field Park, 77777 Strongman St',
        description: 'Join a free outdoor fitness session led by professional trainers. All levels welcome!',
    }
];

export default function AllMeetup() {
    return <section>
        <h1>All meetups</h1>
        <MeetupList meetups={DUMMY_MEETUPS} />
    </section>
}