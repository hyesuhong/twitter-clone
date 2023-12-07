import { collection, getDocs, orderBy, query } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import Post, { post } from './Post';

const Timeline = () => {
	const [posts, setPosts] = useState<post[]>([]);
	const fetchPost = async () => {
		const postQuery = query(
			collection(db, 'tweets'),
			orderBy('createdAt', 'desc')
		);

		const snapshot = await getDocs(postQuery);

		setPosts(
			snapshot.docs.map((doc) => {
				const { text, imgUrl, createdAt, userId, username } = doc.data();

				return { id: doc.id, text, imgUrl, createdAt, userId, username };
			})
		);
	};

	useEffect(() => {
		fetchPost();
	}, []);
	return (
		<>
			{posts.map((post, index) => (
				<Post key={index} {...post} />
			))}
		</>
	);
};

export default Timeline;
