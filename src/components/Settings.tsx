"use client"

import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"

import {
  User,
  Mail,
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Phone,
  Calendar,
  Edit3,
  Save,
  X,
  SettingsIcon,
  Bell,
  Shield,
  Building,
} from "lucide-react"

import type { Candidate, Recruiter } from "../types"

export default function Settings() {
  const { user } = useAuth()
  const [activeSection, setActiveSection] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)

  // Initialize form data based on user role
  const initializeFormData = () => {
    if (user?.role === "candidate") {
      const candidate = user as Candidate
      return {
        // Basic info
        name: candidate.name || "",
        email: candidate.email || "",
        phone: candidate?.phone || "",
        location: candidate?.location || "",
        bio: candidate?.bio || "",
        skills: [...(candidate?.skills || [])],
        experience: candidate?.experience || 0,
        education: candidate?.education ? candidate.education : { degree: "", school: "", year: 0, gpa: 0.0 },
        workExperience: candidate?.workExperience ? candidate.workExperience : { location: "", startDate: "", endDate: "", description: "" },
        certifications: candidate?.certifications ? candidate.certifications : { title: "", issuer: "", year: 0, credentialId: "" },
        jobPreferences: candidate?.jobPreferences ? candidate.jobPreferences
          : { salary: { min: 0, max: 0 }, location: [], jobType: "other" },
        professionalTitle: candidate?.professionalTitle || "",

      }
    } else if (user?.role === "recruiter") {
      const recruiter = user as Recruiter
      return {
        // Basic info
        name: recruiter.name || "",
        email: recruiter.email || "",
        phone: recruiter?.phone || "",
        location: recruiter?.location || "",
        bio: recruiter?.bio || "",
        education: recruiter?.education ? recruiter.education : { degree: "", school: "", year: 0, gpa: 0.0 },
        company: recruiter?.company || "",
        industry: recruiter?.industry || "",
        companySize: recruiter?.companySize || "",
        address: recruiter?.address || "",
        foundedYear: recruiter?.foundedYear || 0,
        companyDescription: recruiter?.companyDescription || "",
        employerRole: recruiter?.employerRole || "",
        requirements: recruiter?.requirements || [],
        companyTypes: recruiter?.companyTypes || [],
        companyLocation: recruiter?.companyLocation || "",
      }


    }
    // Default fallback to avoid undefined
    return {
      // Common fields
      name: "",
      email: "",
      phone: "",
      location: "",
      bio: "",
      education: { degree: "", school: "", year: 0, gpa: 0.0 },
      // Candidate fields
      skills: [],
      experience: 0,
      workExperience: { location: "", startDate: "", endDate: "", description: "" },
      certifications: { title: "", issuer: "", year: 0, credentialId: "" },
      jobPreferences: { salary: { min: 0, max: 0 }, location: [], jobType: "other" },
      professionalTitle: "",
      // Recruiter fields
      company: "",
      industry: "",
      companySize: "",
      address: "",
      foundedYear: 0,
      companyDescription: "",
      employerRole: "",
      requirements: [],
      companyTypes: [],
      companyLocation: ""
    }
  }

  const [formData, setFormData] = useState(initializeFormData())
  const [newSkill, setNewSkill] = useState("")

  const settingsSections = [
    { id: "profile", label: "Profile", icon: User },
    { id: "account", label: "Account", icon: SettingsIcon },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy & Security", icon: Shield },
  ]

  
  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNestedInputChange = (section: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section as keyof typeof prev], [field]: value },
    }))
  }

  // const handleArrayItemChange = (section: string, index: number, field: string, value: any) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     [section]: prev[section as keyof typeof prev].map((item: any, i: number) =>
  //       i === index ? { ...item, [field]: value } : item,
  //     ),
  //   }))
  // }

  // const addArrayItem = (section: string, newItem: any) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     [section]: [...prev[section as keyof typeof prev], { ...newItem, id: Date.now().toString() }],
  //   }))
  // }

  // const removeArrayItem = (section: string, index: number) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     [section]: prev[section as keyof typeof prev].filter((_: any, i: number) => i !== index),
  //   }))
  // }

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills?.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...(prev.skills || []), newSkill.trim()],
      }))
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills?.filter((skill) => skill !== skillToRemove) || [],
    }))
  }

  const handleSave = () => {
    console.log("Saving profile data:", formData)
    setIsEditing(false)
    alert("Profile updated successfully!")
  }

  const handleCancel = () => {
    setFormData(initializeFormData())
    setIsEditing(false)
  }

  const renderCandidateProfile = () => (
    <div className="space-y-8">
      {/* Basic Information */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Basic Information</h3>

        <div className="flex items-start space-x-6 mb-6">
          <img
            src={user?.avatar}
            alt={formData.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="flex-1">
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Professional Title</label>
                  <input
                    type="text"
                    value={formData.professionalTitle}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                  <input
                    type="number"
                    value={formData.experience}
                    onChange={(e) => handleInputChange("experience", Number.parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            ) : (
              <div>
                <h4 className="text-xl font-bold text-gray-900">{formData.name}</h4>
                <p className="text-gray-600 mb-2">{formData.professionalTitle}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    {formData.email}
                  </span>
                  <span className="flex items-center">
                    <Phone className="w-4 h-4 mr-1" />
                    {formData.phone}
                  </span>
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {formData.location}
                  </span>
                  <span className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-1" />
                    {formData.experience} years experience
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Professional Bio</label>
          {isEditing ? (
            <textarea
              value={formData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tell us about yourself..."
            />
          ) : (
            <p className="text-gray-700">{formData.bio}</p>
          )}
        </div>
      </div>

      {/* Skills */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>

        {isEditing ? (
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {formData.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {skill}
                  <button onClick={() => removeSkill(skill)} className="ml-2 text-blue-600 hover:text-blue-800">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addSkill()}
                placeholder="Add a skill"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={addSkill}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {formData.skills?.map((skill, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Job Preferences */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Preferences</h3>

        {isEditing ? (
          <div className="grid grid-cols-1 md:grid-cols-1.5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={formData.jobPreferences?.salary?.min || 0}
                  onChange={(e) =>
                    handleNestedInputChange("jobPreferences", "salary", {
                      ...formData.jobPreferences?.salary,
                      min: Number.parseInt(e.target.value),
                    })
                  }
                  placeholder="Min"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="number"
                  value={formData.jobPreferences?.salary?.max || 0}
                  onChange={(e) =>
                    handleNestedInputChange("jobPreferences", "salary", {
                      ...formData.jobPreferences?.salary,
                      max: Number.parseInt(e.target.value),
                    })
                  }
                  placeholder="Max"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Work Type</label>
              <select
                value={formData.jobPreferences?.jobType || "other"}
                onChange={(e) => handleNestedInputChange("jobPreferences", "jobType", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="freelance">Freelance</option>
                <option value="internship">Internship</option>
                <option value="temporary">Temporary</option>
                <option value="volunteer">Volunteer</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-lg p-3">
              <div className="flex items-center mb-1">
                <DollarSign className="w-4 h-4 text-green-600 mr-2" />
                <span className="font-medium text-green-900">Salary Range</span>
              </div>
              <p className="text-green-800 text-sm">
                ${formData.jobPreferences?.salary?.min?.toLocaleString()} - $
                {formData.jobPreferences?.salary?.max?.toLocaleString()}
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="flex items-center mb-1">
                <Clock className="w-4 h-4 text-blue-600 mr-2" />
                <span className="font-medium text-blue-900">Job Type</span>
              </div>
              <p className="text-blue-800 text-sm capitalize">{formData.jobPreferences?.jobType}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  const renderRecruiterProfile = () => (
    <div className="space-y-8">
      {/* Basic Information */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Basic Information</h3>

        <div className="flex items-start space-x-6 mb-6">
          <img
            src={user?.avatar}
            alt={formData.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="flex-1">
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            ) : (
              <div>
                <h4 className="text-xl font-bold text-gray-900">{formData.name}</h4>
                <p className="text-gray-600 mb-2">Hiring Manager</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    {formData.email}
                  </span>
                  <span className="flex items-center">
                    <Phone className="w-4 h-4 mr-1" />
                    {formData.phone}
                  </span>
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {formData.location}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Company Information */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Company Information</h3>

        {isEditing ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
              <input
                type="text"
                value={formData.industry}
                onChange={(e) => handleInputChange("industry", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
              <select
                value={formData.companySize}
                onChange={(e) => handleInputChange("companySize", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="500+">500+ employees</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Founded Year</label>
              <input
                type="text"
                value={formData.foundedYear}
                onChange={(e) => handleInputChange("foundedYear", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Description</label>
              <textarea
                value={formData.companyDescription}
                onChange={(e) => handleInputChange("companyDescription", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your company..."
              />
            </div>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Building className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-medium text-blue-900">Company</span>
                </div>
                <p className="text-blue-800">{formData.company}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Briefcase className="w-5 h-5 text-green-600 mr-2" />
                  <span className="font-medium text-green-900">Industry</span>
                </div>
                <p className="text-green-800">{formData.industry}</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <User className="w-5 h-5 text-purple-600 mr-2" />
                  <span className="font-medium text-purple-900">Company Size</span>
                </div>
                <p className="text-purple-800">{formData.companySize}</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Calendar className="w-5 h-5 text-yellow-600 mr-2" />
                  <span className="font-medium text-yellow-900">Founded</span>
                </div>
                <p className="text-yellow-800">{formData.foundedYear}</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">About the Company</h4>
              <p className="text-gray-700">{formData.companyDescription}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  const renderAccountSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Change Password</label>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Email Notifications</h4>
              <p className="text-sm text-gray-500">Receive updates via email</p>
            </div>
            <input type="checkbox" className="toggle" defaultChecked />
          </div>
        </div>
      </div>
    </div>
  )

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy & Security</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Profile Visibility</h4>
              <p className="text-sm text-gray-500">Control who can see your profile</p>
            </div>
            <select className="px-3 py-2 border border-gray-300 rounded-lg">
              <option>Public</option>
              <option>Private</option>
              <option>Contacts Only</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Data Export</h4>
              <p className="text-sm text-gray-500">Download your data</p>
            </div>
            <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
              Export Data
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return user?.role === "candidate" ? renderCandidateProfile() : renderRecruiterProfile()
      case "account":
        return renderAccountSettings()
      case "notifications":
        return renderNotificationSettings()
      case "privacy":
        return renderPrivacySettings()
      default:
        return user?.role === "candidate" ? renderCandidateProfile() : renderRecruiterProfile()
    }
  }

  return (
    <div className="flex-1 p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <SettingsIcon className="w-8 h-8 text-blue-600 mr-3" />
                Settings
              </h1>
              <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
            </div>
            {activeSection === "profile" && (
              <div className="flex space-x-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-8">
          {/* Settings Navigation */}
          <div className="w-64">
            <nav className="space-y-2">
              {settingsSections.map((section) => {
                const Icon = section.icon
                return (
                  <button
                    key={section.id}
                    onClick={() => {
                      setActiveSection(section.id)
                      setIsEditing(false)
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${
                      activeSection === section.id
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{section.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Settings Content */}
          <div className="flex-1">{renderContent()}</div>
        </div>
      </div>
    </div>
  )
}
