import {
	Unsubscribe,
	collection,
	limit,
	onSnapshot,
	orderBy,
	query,
} from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import Post, { post } from './Post';

const Timeline = () => {
	const [posts, setPosts] = useState<post[]>([]);
	const fetchPost = () => {
		let unsubscribe: Unsubscribe | undefined;

		const subscribe = async () => {
			const postQuery = query(
				collection(db, 'tweets'),
				orderBy('createdAt', 'desc'),
				limit(25)
			);

			unsubscribe = await onSnapshot(postQuery, (snapshot) => {
				const posts = snapshot.docs.map((doc) => {
					const { text, imgUrl, createdAt, userId, username } = doc.data();

					return { id: doc.id, text, imgUrl, createdAt, userId, username };
				});
				setPosts(posts);
			});
		};

		return { subscribe, unsubscribe };
	};

	useEffect(() => {
		const { subscribe, unsubscribe } = fetchPost();

		subscribe();

		return () => {
			unsubscribe && unsubscribe();
		};
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
