import { useEffect, useState } from "react"
import { userContentStore } from "../store/content";
import axios from "axios";

// custom hook ก็แค่การสร้าง fucntion เพื่อใช้ห hook ที่เขียนไว้
const useGetTrendingContent = () => { // zustand global state แชร์กัน custom hook ไม่ global ไม่แชร์ แต่ เป็น function 
  // ที่ใช้ hook ของ react ที่เรียกได้ทุก componet 
  const [trendingContent, setTrendingContent] = useState(null);
  const { contentType } = userContentStore();

  useEffect(() => {
    const getTrendingContent = async () => {
      const res = await axios.get(`/api/v1/${contentType}/trending`);
      setTrendingContent(res.data.content)
    }

    getTrendingContent();
  }, [contentType])

  return { trendingContent };
}

export default useGetTrendingContent  