import React, { useState } from 'react';
import { Dog, Droplet, Circle, Utensils, Clock, Calendar, Edit2, Check, X } from 'lucide-react';

export default function App() {
  const [activities, setActivities] = useState([]);
  const [editingActivity, setEditingActivity] = useState(null);
  const [editDateTime, setEditDateTime] = useState('');

  const addActivity = (type) => {
    const now = new Date();
    const newActivity = {
      id: Date.now(),
      type,
      timestamp: now
    };
    
    setActivities(prev => [newActivity, ...prev]);
  };

  const startEdit = (activity) => {
    setEditingActivity(activity.id);
    // Format the timestamp for datetime-local input
    const date = new Date(activity.timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    setEditDateTime(`${year}-${month}-${day}T${hours}:${minutes}`);
  };

  const saveEdit = () => {
    if (!editDateTime) return;
    
    setActivities(prev => prev.map(activity => 
      activity.id === editingActivity 
        ? { ...activity, timestamp: new Date(editDateTime) }
        : activity
    ).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
    
    setEditingActivity(null);
    setEditDateTime('');
  };

  const cancelEdit = () => {
    setEditingActivity(null);
    setEditDateTime('');
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString([], { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'pee':
        return <Droplet className="w-5 h-5 text-yellow-600" />;
      case 'poop':
        return <Circle className="w-5 h-5 text-amber-700" />;
      case 'feeding':
        return <Utensils className="w-5 h-5 text-green-600" />;
      default:
        return null;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'pee':
        return 'bg-yellow-50 border-yellow-200';
      case 'poop':
        return 'bg-amber-50 border-amber-200';
      case 'feeding':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      setActivities([]);
    }
  };

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          {/* Penny Graphic */}
          <div className="mb-4">
            <div 
              className="w-20 h-20 mx-auto rounded-full shadow-lg flex items-center justify-center relative"
              style={{
                animation: 'flipCoin 2s linear infinite',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 25%, #92400e 50%, #d97706 75%, #f59e0b 100%)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.3)'
              }}
            >
              {/* Coin edge/thickness */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, #92400e 20%, #a16207 50%, #92400e 80%, transparent 100%)',
                  transform: 'translateZ(-2px)',
                  boxShadow: '0 0 0 2px #78350f, 0 2px 4px rgba(0,0,0,0.5)'
                }}
              ></div>
              
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center relative z-10"
                style={{
                  background: 'radial-gradient(ellipse at 30% 30%, #fbbf24, #f59e0b 40%, #d97706 70%, #92400e)',
                  boxShadow: 'inset 0 4px 8px rgba(255,255,255,0.4), inset 0 -4px 8px rgba(0,0,0,0.4), inset 0 0 16px rgba(0,0,0,0.1)'
                }}
              >
                <span 
                  className="font-bold text-sm"
                  style={{
                    color: '#92400e',
                    textShadow: '0 1px 2px rgba(0,0,0,0.5), 0 0 4px rgba(255,255,255,0.3)'
                  }}
                >
                  1¢
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold text-white">The Penny Log</h1>
          </div>
          <p className="text-gray-300">Tracking Penny's daily adventures</p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          <button
            onClick={() => addActivity('pee')}
            className="flex items-center justify-center gap-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-6 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <Droplet className="w-8 h-8" />
            <span className="text-xl">Pee</span>
          </button>

          <button
            onClick={() => addActivity('poop')}
            className="flex items-center justify-center gap-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-6 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <Circle className="w-8 h-8" />
            <span className="text-xl">Poop</span>
          </button>

          <button
            onClick={() => addActivity('feeding')}
            className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold py-6 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <Utensils className="w-8 h-8" />
            <span className="text-xl">Feeding</span>
          </button>
        </div>

        {/* Activity Timeline */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Activity
            </h2>
            {activities.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-sm text-red-500 hover:text-red-700 font-medium"
              >
                Clear All
              </button>
            )}
          </div>

          {activities.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Dog className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No activities logged yet!</p>
              <p className="text-sm">Start tracking your puppy's activities above.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className={`flex items-center gap-3 p-4 rounded-lg border ${getActivityColor(activity.type)}`}
                >
                  {getActivityIcon(activity.type)}
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 capitalize">
                      {activity.type}
                    </p>
                    {editingActivity === activity.id ? (
                      <div className="flex items-center gap-2 mt-2">
                        <input
                          type="datetime-local"
                          value={editDateTime}
                          onChange={(e) => setEditDateTime(e.target.value)}
                          className="text-sm border rounded px-2 py-1 text-gray-700"
                        />
                        <button
                          onClick={saveEdit}
                          className="p-1 text-green-600 hover:text-green-800"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="p-1 text-red-600 hover:text-red-800"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(activity.timestamp)}</span>
                        <span>•</span>
                        <span>{formatTime(activity.timestamp)}</span>
                        <button
                          onClick={() => startEdit(activity)}
                          className="ml-2 p-1 text-gray-500 hover:text-gray-700"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        {activities.length > 0 && (
          <div className="mt-6 bg-white rounded-xl shadow-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Today's Summary</h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              {['pee', 'poop', 'feeding'].map(type => {
                const todayCount = activities.filter(activity => 
                  activity.type === type && 
                  new Date(activity.timestamp).toDateString() === new Date().toDateString()
                ).length;
                
                return (
                  <div key={type} className={`p-3 rounded-lg ${getActivityColor(type)}`}>
                    {getActivityIcon(type)}
                    <p className="font-bold text-lg mt-1">{todayCount}</p>
                    <p className="text-xs text-gray-600 capitalize">{type}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
