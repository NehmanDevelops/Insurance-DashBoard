import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiUpload, 
  FiFile, 
  FiImage, 
  FiFileText, 
  FiX, 
  FiCheck, 
  FiAlertCircle,
  FiLoader
} from 'react-icons/fi'
import './DocumentUpload.css'

const ACCEPTED_TYPES = {
  'image/jpeg': { icon: FiImage, label: 'JPEG Image' },
  'image/png': { icon: FiImage, label: 'PNG Image' },
  'image/heic': { icon: FiImage, label: 'HEIC Image' },
  'application/pdf': { icon: FiFileText, label: 'PDF Document' },
  'application/msword': { icon: FiFile, label: 'Word Document' },
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': { icon: FiFile, label: 'Word Document' },
}

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

function DocumentUpload({ claimId, onUploadComplete }) {
  const [files, setFiles] = useState([])
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)

  const validateFile = (file) => {
    if (!ACCEPTED_TYPES[file.type]) {
      return `${file.name}: File type not supported. Please upload PDF, Word, or image files.`
    }
    if (file.size > MAX_FILE_SIZE) {
      return `${file.name}: File too large. Maximum size is 10MB.`
    }
    return null
  }

  const processFiles = (newFiles) => {
    setError(null)
    const validFiles = []
    const errors = []

    Array.from(newFiles).forEach(file => {
      const validationError = validateFile(file)
      if (validationError) {
        errors.push(validationError)
      } else {
        validFiles.push({
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          file,
          name: file.name,
          size: file.size,
          type: file.type,
          status: 'pending', // pending, uploading, complete, error
          progress: 0
        })
      }
    })

    if (errors.length > 0) {
      setError(errors.join('\n'))
    }

    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles])
      // Auto-start upload simulation
      validFiles.forEach(f => simulateUpload(f.id))
    }
  }

  const simulateUpload = (fileId) => {
    // Start uploading
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, status: 'uploading' } : f
    ))

    // Simulate progress
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 30
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, status: 'complete', progress: 100 } : f
        ))
        onUploadComplete?.({ fileId, claimId })
      } else {
        setFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, progress: Math.min(progress, 99) } : f
        ))
      }
    }, 200)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    processFiles(e.dataTransfer.files)
  }

  const handleFileSelect = (e) => {
    processFiles(e.target.files)
    e.target.value = '' // Reset input
  }

  const removeFile = (fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const getFileIcon = (type) => {
    const config = ACCEPTED_TYPES[type]
    return config ? config.icon : FiFile
  }

  const completedCount = files.filter(f => f.status === 'complete').length
  const uploadingCount = files.filter(f => f.status === 'uploading').length

  return (
    <div className="document-upload">
      <div className="upload-header">
        <h3>
          <FiUpload size={20} />
          Upload Supporting Documents
        </h3>
        <p>Upload photos, receipts, police reports, or other supporting documents for your claim.</p>
      </div>

      {/* Drop Zone */}
      <div 
        className={`upload-dropzone ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.heic"
          onChange={handleFileSelect}
          hidden
        />
        <div className="dropzone-content">
          <div className="dropzone-icon">
            <FiUpload size={32} />
          </div>
          <p className="dropzone-title">
            {isDragging ? 'Drop files here' : 'Drag & drop files here'}
          </p>
          <p className="dropzone-subtitle">
            or <span className="link">browse from your device</span>
          </p>
          <p className="dropzone-hint">
            Supports: PDF, Word, JPEG, PNG • Max 10MB per file
          </p>
        </div>
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div 
            className="upload-error"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <FiAlertCircle size={18} />
            <span>{error}</span>
            <button onClick={() => setError(null)} className="error-dismiss">
              <FiX size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* File List */}
      {files.length > 0 && (
        <div className="upload-files">
          <div className="files-header">
            <span>{files.length} file{files.length !== 1 ? 's' : ''}</span>
            {completedCount > 0 && (
              <span className="completed-count">
                <FiCheck size={14} /> {completedCount} uploaded
              </span>
            )}
          </div>
          <div className="files-list">
            <AnimatePresence>
              {files.map((file) => {
                const FileIcon = getFileIcon(file.type)
                return (
                  <motion.div 
                    key={file.id}
                    className={`file-item ${file.status}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <div className="file-icon">
                      <FileIcon size={20} />
                    </div>
                    <div className="file-info">
                      <span className="file-name">{file.name}</span>
                      <span className="file-size">{formatFileSize(file.size)}</span>
                      {file.status === 'uploading' && (
                        <div className="file-progress">
                          <div 
                            className="file-progress-bar" 
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                    <div className="file-status">
                      {file.status === 'uploading' && (
                        <span className="status-uploading">
                          <FiLoader className="spin" size={16} />
                          {Math.round(file.progress)}%
                        </span>
                      )}
                      {file.status === 'complete' && (
                        <span className="status-complete">
                          <FiCheck size={16} />
                          Uploaded
                        </span>
                      )}
                      {file.status === 'pending' && (
                        <span className="status-pending">Waiting...</span>
                      )}
                    </div>
                    {file.status !== 'uploading' && (
                      <button 
                        className="file-remove"
                        onClick={() => removeFile(file.id)}
                        aria-label="Remove file"
                      >
                        <FiX size={16} />
                      </button>
                    )}
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="upload-tips">
        <h4>📌 Tips for faster processing:</h4>
        <ul>
          <li>Include all pages of documents (front and back)</li>
          <li>Ensure photos are clear and well-lit</li>
          <li>Include date stamps if visible</li>
          <li>Upload police reports for auto accidents</li>
        </ul>
      </div>
    </div>
  )
}

export default DocumentUpload
