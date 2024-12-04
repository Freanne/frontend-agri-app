import DiagnosisForm from '@/components/diagnostic'
import UploadInterface from '@/components/diagnostic/Upload'
import Header from '@/components/header'
import React from 'react'

const Diagnostic
 = () => {
  return (
    <div>
        <div className="px-5 bg-green-50 py-20 min-h-[90vh]">
          <UploadInterface />
        </div>
    </div>
  )
}

export default Diagnostic
