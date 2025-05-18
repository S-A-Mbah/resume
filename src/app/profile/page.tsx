import ProfileEditor from '../components/ProfileEditor'

export default function ProfilePage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Manage Your Profile
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Update your personal information that will be used throughout your portfolio site and in your resume.
        </p>
        <ProfileEditor />
      </div>
    </div>
  )
} 