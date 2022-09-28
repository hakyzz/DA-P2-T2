import { useState, useEffect } from "react";

const apiURL = "https://jsonplaceholder.typicode.com/posts";

export default function POSTS() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true);
    showData();
  }, [])

  const showData = async () => {
    getData();
    setLoading(false);
    console.log(data);
  }

  const getData = async () => {
    const data = await fetch(apiURL);
    const posts = await data.json();
    setData(posts);
  };

  const postData = async (e) => {
    e.preventDefault();

    fetch(apiURL, {
      method: 'POST',
      body: JSON.stringify({
        title: e.target.elements.title.value,
        body: e.target.elements.body.value,
        userId: data[data.length - 1].id + 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    getData();
  }

  if (isLoading) return <p className="text-gray-700 text-base">Fetching Posts...</p>
  if (!data) return <p>No POSTS fetched</p>
  return (
    <div>
      <h1 className="font-bold text-2xl m-2">ADD POSTS</h1>
      <form onSubmit={postData} className="w-2/5">
        <input className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" name="title" placeholder="Title" />
        <input className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" name="body" placeholder="Body" />
        <button className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline" type="submit">Add post</button>
      </form>


      <h1 className="font-bold text-2xl m-2">POSTS</h1>
      {data.map(post =>
        <div key={post.id} className="m-2 rounded overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{post.title}</div>
            <p className="text-gray-700 text-base"> {post.body} </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2">#{post.id}</span>
          </div>
        </div>
      )}
    </div>
  )
}
