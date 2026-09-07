// GFC/src/pages/UploadPage.tsx

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Upload, Image, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface UploadPageProps {
  apiUrl: string;
}

export const UploadPage: React.FC<UploadPageProps> = ({ apiUrl }) => {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('event') || '';
  const dateIndex = parseInt(searchParams.get('date') || '0', 10);
  
  const [eventTitle, setEventTitle] = useState('');
  const [dateTitle, setDateTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch event details
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/content`);
        const data = await response.json();
        const event = data.events?.find((e: any) => e.id === eventId);
        
        if (event) {
          setEventTitle(event.title);
          const entries = event.dateEntries || [];
          const entry = entries[dateIndex];
          if (entry) {
            setDateTitle(entry.date || `Album ${dateIndex + 1}`);
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching event:', error);
        setIsLoading(false);
      }
    };

    if (eventId) {
      fetchEventDetails();
    } else {
      setIsLoading(false);
    }
  }, [eventId, dateIndex, apiUrl]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setUploadStatus('idle');
      setErrorMessage('');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    if (!eventId) {
      setErrorMessage('Event ID is missing. Please use a valid QR code.');
      return;
    }

    setIsUploading(true);
    setUploadStatus('loading');
    setErrorMessage('');

    try {
      // Convert image to base64
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(selectedFile);
      });
      
      const base64Image = await base64Promise;

      // Upload to API
      const response = await fetch(`${apiUrl}/api/uploads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: base64Image,
          eventId: eventId,
          dateIndex: dateIndex,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Upload failed');
      }

      setUploadStatus('success');
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to upload photo. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadStatus('idle');
    setErrorMessage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 via-white to-purple-50 dark:from-[#0a0a14] dark:via-[#0f0f1a] dark:to-[#0a0a14]">
        <div className="text-center space-y-3">
          <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mx-auto" />
          <p className="text-gray-500 dark:text-[#A1A1A1]">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!eventId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 via-white to-purple-50 dark:from-[#0a0a14] dark:via-[#0f0f1a] dark:to-[#0a0a14] p-4">
        <div className="bg-white dark:bg-[#1A1A1A] rounded-3xl max-w-md w-full p-8 text-center shadow-2xl border border-gray-200 dark:border-white/10">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-xl font-bold text-black dark:text-white mb-2">Invalid QR Code</h2>
          <p className="text-sm text-gray-500 dark:text-[#A1A1A1]">
            The QR code you scanned does not contain a valid event ID.
            Please contact the church admin for assistance.
          </p>
        </div>
      </div>
    );
  }

  if (uploadStatus === 'success') {
    return (
      <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 dark:from-[#0a0a14] dark:via-[#0f0f1a] dark:to-[#0a0a14] flex items-center justify-center p-4">
        <div className="bg-white dark:bg-[#1A1A1A] rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl border border-gray-200 dark:border-white/10">
          <div className="text-center py-8 space-y-4">
            <div className="w-20 h-20 mx-auto bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-emerald-500" />
            </div>
            <h3 className="text-xl font-bold text-black dark:text-white">Thank You! 🎉</h3>
            <p className="text-sm text-gray-500 dark:text-[#A1A1A1]">
              Your photo has been uploaded successfully! It will appear in the church gallery soon.
            </p>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-sm font-bold transition-all"
            >
              Upload Another Photo
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 dark:from-[#0a0a14] dark:via-[#0f0f1a] dark:to-[#0a0a14] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#1A1A1A] rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl border border-gray-200 dark:border-white/10">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mb-3 overflow-hidden">
            <img src="/image.png" alt="GFC" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-2xl font-serif text-black dark:text-white">Gospel Fellowship Church</h1>
          <p className="text-xs text-gray-500 dark:text-[#A1A1A1] mt-1">Photo Upload</p>
        </div>

        {/* Event Info */}
        <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-xl p-4 mb-6 border border-indigo-200 dark:border-indigo-800/30">
          <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Uploading to:</div>
          <div className="font-bold text-black dark:text-white">{eventTitle || 'Event'}</div>
          <div className="text-sm text-gray-600 dark:text-[#A1A1A1]">{dateTitle || 'Album'}</div>
        </div>

        {/* File Input Area */}
        <div
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
            previewUrl
              ? 'border-emerald-300 dark:border-emerald-500/50 bg-emerald-50/50 dark:bg-emerald-950/20'
              : 'border-gray-300 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-400/50'
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          {previewUrl ? (
            <div className="relative">
              <img
                src={previewUrl}
                alt="Preview"
                className="max-h-64 mx-auto rounded-xl object-contain"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleReset();
                }}
                className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="py-8">
              <div className="w-16 h-16 mx-auto bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center mb-3">
                <Image className="w-8 h-8 text-indigo-500" />
              </div>
              <p className="text-sm font-medium text-black dark:text-white">
                Tap to select a photo
              </p>
              <p className="text-xs text-gray-500 dark:text-[#A1A1A1] mt-1">
                Choose an image from your gallery
              </p>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="mt-3 p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-500/30 rounded-xl text-red-700 dark:text-red-300 text-sm flex items-start gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={!selectedFile || isUploading}
          className="w-full mt-4 py-3.5 bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-400 dark:hover:brightness-110 text-white font-extrabold rounded-xl text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              <span>Upload Photo</span>
            </>
          )}
        </button>

        {/* File Info */}
        {selectedFile && (
          <div className="mt-3 text-xs text-gray-500 dark:text-[#A1A1A1] text-center">
            {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
          </div>
        )}
      </div>
    </div>
  );
};