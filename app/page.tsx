import BlogSection from "@/components/blog";
import DiagnosisSection from "@/components/category";
import Header from "@/components/header";
import HeroSection from "@/components/hero";
import HeroHome from "@/components/hero";
import PlanSection from "@/components/plan";


export default function Home() {
  return (
    <main className="">
      <Header/>
      <HeroSection/>
      <DiagnosisSection/>
      <PlanSection/>
      <BlogSection/>
    </main>
  );
}
//'use client'
// export interface Post {
//   id: number;
//   title: string;
//   content: string;
//   created_at: string;
//   updated_at: string;
// }

// // pages/index.tsx
// import React, { useEffect, useState } from 'react';


// const Home: React.FC = () => {
//     const [posts, setPosts] = useState<Post[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);

//     useEffect(() => {
//         const fetchPosts = async () => {
//             try {
//                 const response = await fetch('/api/posts');
//                 const data: Post[] = await response.json();
//                 setPosts(data);
//             } catch (error) {
//                 console.error('Failed to fetch posts:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchPosts();
//     }, []);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             <h1>Blog</h1>
//             <ul>
//                 {posts.map((post) => (
//                     <li key={post.id}>
//                         <h2>{post.title}</h2>
//                         <p>{post.content}</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default Home;
