import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import CampaignList from '../components/CampaignList';
import RedemptionComponent from '../components/RedemptionComponent';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const shopName = localStorage.getItem('shopName') || 'Shop Owner';

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    {
      title: 'Total Campaigns',
      value: '12',
      change: '+2 this month',
      icon: '📊',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Total Scans',
      value: '1,234',
      change: '+15% this week',
      icon: '📱',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Redemptions',
      value: '456',
      change: '+8% this week',
      icon: '🎯',
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'ROI',
      value: '₹25,680',
      change: '+12% this month',
      icon: '💰',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" style={{animationDelay: '4s'}}></div>
      </div>

      <Navbar />
      
      <div className="relative z-10 max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header Section */}
          <div className={`mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
                  Dashboard
                </h1>
                <p className="text-xl text-gray-600">
                  Welcome back, <span className="text-blue-600 font-semibold">{shopName}</span>! Here's what's happening with your campaigns.
                </p>
              </div>
              <div className="mt-6 md:mt-0">
                <button
                  onClick={() => navigate('/new-campaign')}
                  className="group inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <svg className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create New Campaign
                </button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{transitionDelay: '200ms'}}>
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20 group"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-2xl">{stat.icon}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600 font-medium">{stat.change}</p>
                  </div>
                </div>
                <h3 className="text-gray-600 font-medium group-hover:text-gray-900 transition-colors duration-300">
                  {stat.title}
                </h3>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Campaigns Section */}
            <div className={`lg:col-span-2 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{transitionDelay: '400ms'}}>
              <CampaignList />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Redemption Component */}
              <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{transitionDelay: '600ms'}}>
                <RedemptionComponent />
              </div>

              {/* Quick Actions */}
              <div className={`bg-white/80 backdrop-blur-md rounded-3xl shadow-lg border border-white/20 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{transitionDelay: '800ms'}}>
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
                </div>
                <div className="p-6 space-y-4">
                  <button
                    onClick={() => navigate('/new-campaign')}
                    className="w-full flex items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 rounded-2xl transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-lg">🚀</span>
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">New Campaign</p>
                      <p className="text-sm text-gray-600">Create AI-powered campaigns</p>
                    </div>
                  </button>

                  <button className="w-full flex items-center p-4 bg-gradient-to-r from-green-50 to-teal-50 hover:from-green-100 hover:to-teal-100 rounded-2xl transition-all duration-300 group">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-lg">📊</span>
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">View Analytics</p>
                      <p className="text-sm text-gray-600">Track campaign performance</p>
                    </div>
                  </button>

                  <button className="w-full flex items-center p-4 bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 rounded-2xl transition-all duration-300 group">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-lg">🎯</span>
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">QR Codes</p>
                      <p className="text-sm text-gray-600">Generate & manage QR codes</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Tips Card */}
              <div className={`bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-6 shadow-lg border border-yellow-100 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{transitionDelay: '1000ms'}}>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mr-3">
                    <span className="text-white text-lg">💡</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">Pro Tip</h3>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Festival season is coming! Create campaigns for Diwali, Christmas, and New Year to maximize your sales. Use our AI suggestions for the best results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;