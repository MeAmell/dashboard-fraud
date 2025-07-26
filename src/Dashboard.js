import React, { useState, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { AlertTriangle, Phone, Mail, Globe, MessageSquare, Calendar, Camera, Plus, X, Search, Filter, Bell, Settings, User, Menu } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showReportForm, setShowReportForm] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const fileInputRef = useRef(null);

  // Sample data untuk charts
  const fraudStatsData = [
    { month: 'Jan', phishing: 120, rekrutmen: 80, investasi: 45 },
    { month: 'Feb', phishing: 135, rekrutmen: 95, investasi: 55 },
    { month: 'Mar', phishing: 150, rekrutmen: 110, investasi: 95 },
    { month: 'Apr', phishing: 140, rekrutmen: 105, investasi: 85 },
    { month: 'May', phishing: 125, rekrutmen: 90, investasi: 75 },
    { month: 'Jun', phishing: 160, rekrutmen: 120, investasi: 90 },
    { month: 'Jul', phishing: 185, rekrutmen: 95, investasi: 80 },
    { month: 'Aug', phishing: 175, rekrutmen: 140, investasi: 85 },
    { month: 'Sep', phishing: 165, rekrutmen: 125, investasi: 90 },
    { month: 'Oct', phishing: 190, rekrutmen: 110, investasi: 70 },
    { month: 'Nov', phishing: 195, rekrutmen: 100, investasi: 50 }
  ];

  const detectionData = [
    { month: 'Jan', value: 200 },
    { month: 'Feb', value: 250 },
    { month: 'Mar', value: 300 },
    { month: 'Apr', value: 320 },
    { month: 'May', value: 380 },
    { month: 'Jun', value: 420 },
    { month: 'Jul', value: 480 },
    { month: 'Aug', value: 550 },
    { month: 'Sep', value: 620 },
    { month: 'Oct', value: 680 },
    { month: 'Nov', value: 750 },
    { month: 'Dec', value: 850 }
  ];

  const distributionData = [
    { channel: 'WhatsApp', count: 245, color: '#10B981' },
    { channel: 'Web', count: 180, color: '#3B82F6' },
    { channel: 'Iklan', count: 150, color: '#8B5CF6' },
    { channel: 'Marketplace', count: 120, color: '#F59E0B' },
    { channel: 'Social Media', count: 95, color: '#EF4444' },
    { channel: 'Email', count: 75, color: '#6B7280' }
  ];

  const [formData, setFormData] = useState({
    // Data Pelapor
    reporterEmail: '',
    reporterName: '',
    reporterPhone: '',
    
    // Data Penipu
    fraudsterPhone: '',
    fraudsterSocialMedia: '',
    fraudsterWebsite: '',
    fraudsterPost: '',
    
    // Detail Kejadian
    chronology: '',
    fraudType: '',
    evidenceImages: [],
    reportDate: new Date().toISOString().split('T')[0]
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const fileUrls = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({
      ...prev,
      evidenceImages: [...prev.evidenceImages, ...fileUrls]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      evidenceImages: prev.evidenceImages.filter((_, i) => i !== index)
    }));
  };

  const handleSubmitReport = () => {
    console.log('Submitting fraud report:', formData);
    setShowReportForm(false);
    setNotifications(prev => prev + 1);
    // Reset form
    setFormData({
      reporterEmail: '',
      reporterName: '',
      reporterPhone: '',
      fraudsterPhone: '',
      fraudsterSocialMedia: '',
      fraudsterWebsite: '',
      fraudsterPost: '',
      chronology: '',
      fraudType: '',
      evidenceImages: [],
      reportDate: new Date().toISOString().split('T')[0]
    });
  };

  const ReportForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Laporan Penipuan Baru</h2>
          <button 
            onClick={() => setShowReportForm(false)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Data Pelapor */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Data Pelapor
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Pelapor *</label>
                <input
                  type="email"
                  value={formData.reporterEmail}
                  onChange={(e) => handleInputChange('reporterEmail', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="email@domain.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Pelapor</label>
                <input
                  type="text"
                  value={formData.reporterName}
                  onChange={(e) => handleInputChange('reporterName', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nama lengkap"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon Pelapor</label>
                <input
                  type="tel"
                  value={formData.reporterPhone}
                  onChange={(e) => handleInputChange('reporterPhone', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+62 xxx xxxx xxxx"
                />
              </div>
            </div>
          </div>

          {/* Data Penipu */}
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="font-semibold text-red-800 mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Data Pihak yang Diduga Melakukan Penipuan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Phone className="w-4 h-4 mr-1" />
                  Nomor Telepon Penipu
                </label>
                <input
                  type="tel"
                  value={formData.fraudsterPhone}
                  onChange={(e) => handleInputChange('fraudsterPhone', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="+62 xxx xxxx xxxx"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Akun Media Sosial
                </label>
                <input
                  type="text"
                  value={formData.fraudsterSocialMedia}
                  onChange={(e) => handleInputChange('fraudsterSocialMedia', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="@username atau link profil"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Globe className="w-4 h-4 mr-1" />
                  Tautan Website
                </label>
                <input
                  type="url"
                  value={formData.fraudsterWebsite}
                  onChange={(e) => handleInputChange('fraudsterWebsite', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="https://website-penipu.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unggahan Terkait</label>
                <input
                  type="text"
                  value={formData.fraudsterPost}
                  onChange={(e) => handleInputChange('fraudsterPost', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Link postingan atau deskripsi"
                />
              </div>
            </div>
          </div>

          {/* Detail Kejadian */}
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Detail Kejadian
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Penipuan</label>
                  <select
                    value={formData.fraudType}
                    onChange={(e) => handleInputChange('fraudType', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="">Pilih jenis penipuan</option>
                    <option value="phishing">Phishing</option>
                    <option value="rekrutmen">Rekrutmen Scam</option>
                    <option value="investasi">Investment Fraud</option>
                    <option value="marketplace">Marketplace Fraud</option>
                    <option value="romance">Romance Scam</option>
                    <option value="other">Lainnya</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Kejadian</label>
                  <input
                    type="date"
                    value={formData.reportDate}
                    onChange={(e) => handleInputChange('reportDate', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kronologi Kejadian</label>
                <textarea
                  value={formData.chronology}
                  onChange={(e) => handleInputChange('chronology', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent h-32"
                  placeholder="Ceritakan secara detail bagaimana penipuan terjadi..."
                />
              </div>
            </div>
          </div>

          {/* Upload Bukti */}
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-800 mb-4 flex items-center">
              <Camera className="w-5 h-5 mr-2" />
              Bukti dalam Bentuk Gambar
            </h3>
            <div className="space-y-4">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-purple-300 rounded-lg p-6 text-center cursor-pointer hover:border-purple-400 hover:bg-purple-100 transition-colors"
              >
                <Camera className="w-12 h-12 mx-auto text-purple-400 mb-2" />
                <p className="text-purple-600 font-medium">Klik untuk upload gambar</p>
                <p className="text-purple-500 text-sm">Screenshot, foto, atau dokumen lainnya</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              
              {formData.evidenceImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.evidenceImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img 
                        src={image} 
                        alt={`Evidence ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button 
              onClick={() => setShowReportForm(false)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Batal
            </button>
            <button 
              onClick={handleSubmitReport}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Submit Laporan
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">DigiForensicAI</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <Bell className="w-5 h-5 text-gray-600" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm text-gray-700">munafauziahazzahra@gmail.com</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm h-screen sticky top-0">
          <nav className="p-4 space-y-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === 'dashboard' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Menu className="w-5 h-5" />
              <span>Dashboard Fraud</span>
            </button>
            <div className="pt-4">
              <h3 className="px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Integrasi</h3>
              <div className="mt-2 space-y-1">
                <div className="px-4 py-2 text-sm text-gray-600">Kunci Akses</div>
                <div className="px-4 py-2 text-sm text-gray-600">Dokumentasi API Deteksi Anomali</div>
                <div className="px-4 py-2 text-sm text-gray-600">Dokumentasi API Deteksi Judi</div>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'dashboard' && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Digital Fraud Monitoring & Detection</h1>
                <div className="flex space-x-3">
                  <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>Jenis Penipuan</option>
                    <option>Phishing</option>
                    <option>Rekrutmen Scam</option>
                    <option>Investment Fraud</option>
                  </select>
                  <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>Kanal</option>
                    <option>WhatsApp</option>
                    <option>Email</option>
                    <option>Web</option>
                  </select>
                  <button 
                    onClick={() => setShowReportForm(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Lapor Penipuan
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Statistik Laporan Penipuan */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Statistik Laporan Penipuan</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={fraudStatsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" stroke="#666" />
                      <YAxis stroke="#666" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px'
                        }} 
                      />
                      <Legend />
                      <Line type="monotone" dataKey="phishing" stroke="#3B82F6" strokeWidth={2} name="Phishing" />
                      <Line type="monotone" dataKey="rekrutmen" stroke="#10B981" strokeWidth={2} name="Rekrutmen Scam" />
                      <Line type="monotone" dataKey="investasi" stroke="#8B5CF6" strokeWidth={2} name="Investment Fraud" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Kanal Distribusi */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Kanal Distribusi</h2>
                  <div className="space-y-4">
                    {distributionData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{item.channel}</span>
                        <div className="flex items-center space-x-3">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full" 
                              style={{ 
                                width: `${(item.count / 245) * 100}%`,
                                backgroundColor: item.color 
                              }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-gray-900 w-8">{item.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deteksi Lonjakan Modus Baru */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Deteksi Lonjakan Modus Baru</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={detectionData}>
                      <defs>
                        <linearGradient id="colorDetection" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" stroke="#666" />
                      <YAxis stroke="#666" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px'
                        }} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#3B82F6" 
                        fillOpacity={1} 
                        fill="url(#colorDetection)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Distribusi Jaringan Penipu */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Distribusi Jaringan Penipu</h2>
                  <div className="relative h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="absolute inset-0 p-4">
                      {/* Simulated network nodes */}
                      <div className="relative w-full h-full">
                        <div className="absolute top-4 left-4 w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="absolute top-8 right-12 w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="absolute bottom-16 left-8 w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="absolute bottom-8 right-8 w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="absolute top-12 left-1/2 w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="absolute bottom-12 left-1/3 w-3 h-3 bg-gray-400 rounded-full"></div>
                        <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-gray-800 rounded-full"></div>
                        <div className="absolute bottom-4 right-1/2 w-3 h-3 bg-gray-800 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>Pemimpin</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span>Aktif</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
                      <span>Normal</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                      <span>Pasif</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'report' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Lapor Penipuan</h1>
                <div className="text-center py-12">
                  <AlertTriangle className="w-16 h-16 mx-auto text-red-500 mb-4" />
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Laporkan Aktivitas Penipuan</h2>
                  <p className="text-gray-600 mb-6">
                    Bantu kami melindungi masyarakat dengan melaporkan aktivitas penipuan yang Anda temui
                  </p>
                  <button 
                    onClick={() => setShowReportForm(true)}
                    className="px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center space-x-2 mx-auto"
                  >
                    <AlertTriangle className="w-5 h-5" />
                    <span>Buat Laporan Baru</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Report Form Modal */}
      {showReportForm && <ReportForm />}
    </div>
  );
};

export default Dashboard;