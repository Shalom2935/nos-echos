// 'use client'

// import { useEffect, useState } from 'react'
// //import { testimonyService } from '@/app/services/testimony.service'
// import type { Testimony } from '@/app/types/testimony'

// export default function TestimonialList() {
//   const [testimonies, setTestimonies] = useState<Testimony[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     const fetchTestimonies = async () => {
//       try {
//         setLoading(true)
//         setError(null)
//         const data = await testimonyService.findAll()
//         setTestimonies(data)
//       } catch (err) {
//         setError('Failed to load testimonies')
//         console.error('Error fetching testimonies:', err)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchTestimonies()
//   }, [])

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center p-8">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="rounded-md bg-red-50 p-4">
//         <div className="flex">
//           <div className="flex-shrink-0">
//             <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//             </svg>
//           </div>
//           <div className="ml-3">
//             <p className="text-sm font-medium text-red-800">{error}</p>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   if (testimonies.length === 0) {
//     return (
//       <div className="text-center p-8 bg-gray-50 rounded-lg">
//         <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//         </svg>
//         <h3 className="mt-2 text-sm font-medium text-gray-900">No testimonies yet</h3>
//         <p className="mt-1 text-sm text-gray-500">Be the first to share your story.</p>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-4">
//       {testimonies.map((testimony) => (
//         <div
//           key={testimony.id}
//           className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
//         >
//           <div className="flex items-center justify-between mb-2">
//             <div className="flex items-center space-x-2">
//               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
//                 {testimony.type}
//               </span>
//               <span className="text-sm text-gray-500">
//                 {testimony.gender} • {testimony.age}
//               </span>
//             </div>
//             <span className="text-sm text-gray-500">
//               {new Date(testimony.createdAt).toLocaleDateString()}
//             </span>
//           </div>
//           <p className="text-gray-800 whitespace-pre-wrap">{testimony.content}</p>
//         </div>
//       ))}
//     </div>
//   )
// } 