'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, Mail, MessageSquare, Calendar, CheckCircle, XCircle, Trash2, Eye, EyeOff } from 'lucide-react';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at: string;
}

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'read' | 'unread'>('all');
  const [stats, setStats] = useState({
    total: 0,
    read: 0,
    unread: 0,
  });
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [submissionToDelete, setSubmissionToDelete] = useState<ContactSubmission | null>(null);

  const fetchSubmissions = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filter !== 'all') {
        params.append('read', filter === 'read' ? 'true' : 'false');
      }
      if (searchTerm) {
        params.append('search', searchTerm);
      }

      const response = await fetch(`/api/admin/submissions?${params.toString()}`, {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setSubmissions(data.submissions || []);
        setStats({
          total: data.total || 0,
          read: data.read || 0,
          unread: data.unread || 0,
        });
      }
    } catch (error) {
      // Silently handle errors
    } finally {
      setLoading(false);
    }
  }, [filter, searchTerm]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const handleMarkAsRead = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/submissions/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ read: !currentStatus }),
      });

      if (response.ok) {
        fetchSubmissions();
        if (selectedSubmission && selectedSubmission.id === id) {
          setSelectedSubmission({ ...selectedSubmission, read: !currentStatus });
        }
      } else {
        alert('Failed to update submission status');
      }
    } catch (error) {
      console.error('Error updating submission:', error);
      alert('An error occurred');
    }
  };

  const handleDelete = async () => {
    if (!submissionToDelete) return;

    try {
      const response = await fetch(`/api/admin/submissions/${submissionToDelete.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setSubmissions(submissions.filter(s => s.id !== submissionToDelete.id));
        setShowDeleteModal(false);
        setSubmissionToDelete(null);
        if (selectedSubmission && selectedSubmission.id === submissionToDelete.id) {
          setSelectedSubmission(null);
        }
        fetchSubmissions();
      } else {
        alert('Failed to delete submission');
      }
    } catch (error) {
      console.error('Error deleting submission:', error);
      alert('An error occurred');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#6B9E3E] mb-4"></div>
          <p className="text-gray-600">Loading submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2C5F2D]">Contact Submissions</h1>
          <p className="text-gray-600 mt-1">Manage contact form submissions</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Submissions</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Unread</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.unread}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Read</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.read}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Filters and Search */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search submissions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
                />
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors text-left ${
                    filter === 'all'
                      ? 'bg-[#6B9E3E] text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('unread')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors text-left ${
                    filter === 'unread'
                      ? 'bg-[#6B9E3E] text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Unread
                </button>
                <button
                  onClick={() => setFilter('read')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors text-left ${
                    filter === 'read'
                      ? 'bg-[#6B9E3E] text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Read
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Submissions List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
              {submissions.length === 0 ? (
                <div className="px-6 py-12 text-center text-gray-500">
                  {searchTerm ? 'No submissions found matching your search' : 'No submissions found'}
                </div>
              ) : (
                submissions.map((submission) => (
                  <div
                    key={submission.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                      !submission.read ? 'bg-blue-50' : ''
                    } ${selectedSubmission?.id === submission.id ? 'bg-[#6B9E3E]/10' : ''}`}
                    onClick={() => setSelectedSubmission(submission)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900 truncate">{submission.name}</h3>
                          {!submission.read && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 truncate">{submission.email}</p>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{submission.message}</p>
                        <p className="text-xs text-gray-400 mt-2">
                          {new Date(submission.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkAsRead(submission.id, submission.read);
                          }}
                          className={`p-2 rounded-lg transition-colors ${
                            submission.read
                              ? 'text-gray-400 hover:bg-gray-100'
                              : 'text-blue-600 hover:bg-blue-50'
                          }`}
                          title={submission.read ? 'Mark as unread' : 'Mark as read'}
                        >
                          {submission.read ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSubmissionToDelete(submission);
                            setShowDeleteModal(true);
                          }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete submission"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Submission Detail Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Submission Details</h3>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Name</label>
                <p className="text-gray-900 mt-1">{selectedSubmission.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className="text-gray-900 mt-1">{selectedSubmission.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Message</label>
                <p className="text-gray-900 mt-1 whitespace-pre-wrap">{selectedSubmission.message}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Submitted</label>
                <p className="text-gray-900 mt-1">
                  {new Date(selectedSubmission.created_at).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    handleMarkAsRead(selectedSubmission.id, selectedSubmission.read);
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedSubmission.read
                      ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      : 'bg-[#6B9E3E] text-white hover:bg-[#5a8433]'
                  }`}
                >
                  {selectedSubmission.read ? 'Mark as Unread' : 'Mark as Read'}
                </button>
                <button
                  onClick={() => {
                    setSubmissionToDelete(selectedSubmission);
                    setShowDeleteModal(true);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && submissionToDelete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Submission</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete the submission from <strong>{submissionToDelete.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSubmissionToDelete(null);
                }}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

