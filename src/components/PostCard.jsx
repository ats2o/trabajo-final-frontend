'use client'
import Link from "next/link"

export default function PostCard({ gente }) {
    return (
        <div className="p-10">
            <Link href={`/post/${gente._id}`}>
            
            </Link>
        </div>
    )
}