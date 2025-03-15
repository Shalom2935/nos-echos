// 'use client'

// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { z } from 'zod'
// import { testimonyService } from '@/app/services/testimony.service'
// import { useState } from 'react'

// const testimonySchema = z.object({
//   type: z.enum(['survivor', 'witness'], {
//     required_error: 'Please select a type',
//   }),
//   gender: z.enum(['male', 'female', 'other'], {
//     required_error: 'Please select a gender',
//   }),
//   age: z.enum(['18-24', '25-34', '35-44', '45+'], {
//     required_error: 'Please select an age range',
//   }),
//   content: z.string().min(10, 'Content must be at least 10 characters'),
// })

// type TestimonyFormData = z.infer<typeof testimonySchema>

// export default function TestimonyForm() {
//   const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors, isSubmitting },
//   } = useForm<TestimonyFormData>({
//     resolver: zodResolver(testimonySchema),
//   })

//   const onSubmit = async (data: TestimonyFormData) => {
//     try {
//       setSubmitStatus('idle')
//       await testimonyService.create(data)
//       reset()
//       setSubmitStatus('success')
//     } catch (error) {
//       setSubmitStatus('error')
//       console.error('Submission error:', error)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Type</label>
//         <select
//           {...register('type')}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//         >
//           <option value="">Select type</option>
//           <option value="survivor">Survivor</option>
//           <option value="witness">Witness</option>
//         </select>
//         {errors.type && (
//           <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
//         )}
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">Gender</label>
//         <select
//           {...register('gender')}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//         >
//           <option value="">Select gender</option>
//           <option value="male">Male</option>
//           <option value="female">Female</option>
//           <option value="other">Other</option>
//         </select>
//         {errors.gender && (
//           <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
//         )}
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">Age</label>
//         <select
//           {...register('age')}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//         >
//           <option value="">Select age range</option>
//           <option value="18-24">18-24</option>
//           <option value="25-34">25-34</option>
//           <option value="35-44">35-44</option>
//           <option value="45+">45+</option>
//         </select>
//         {errors.age && (
//           <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
//         )}
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">Your Story</label>
//         <textarea
//           {...register('content')}
//           rows={4}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//           placeholder="Share your story here..."
//         />
//         {errors.content && (
//           <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
//         )}
//       </div>

//       {submitStatus === 'success' && (
//         <div className="rounded-md bg-green-50 p-4">
//           <div className="flex">
//             <div className="flex-shrink-0">
//               <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//               </svg>
//             </div>
//             <div className="ml-3">
//               <p className="text-sm font-medium text-green-800">Testimony submitted successfully!</p>
//             </div>
//           </div>
//         </div>
//       )}

//       {submitStatus === 'error' && (
//         <div className="rounded-md bg-red-50 p-4">
//           <div className="flex">
//             <div className="flex-shrink-0">
//               <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//               </svg>
//             </div>
//             <div className="ml-3">
//               <p className="text-sm font-medium text-red-800">Error submitting testimony. Please try again.</p>
//             </div>
//           </div>
//         </div>
//       )}

//       <button
//         type="submit"
//         disabled={isSubmitting}
//         className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {isSubmitting ? 'Submitting...' : 'Submit Testimony'}
//       </button>
//     </form>
//   )
// } 