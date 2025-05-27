import AssignmentPage from '@/components/assignment/ui'
import ExamPage from '@/components/exam/ui'
import ParentPage from '@/components/parent/ui'
import StudentPage from '@/components/student/ui'
import SubjectPage from '@/components/subject/ui'
import TeacherPage from '@/components/teacher/ui'

import React from 'react'

const page = () => {
  return (
    <div>
        <TeacherPage />
        <StudentPage />
        <SubjectPage />
        <ParentPage />
        <ExamPage />
        <AssignmentPage />
        
        
    </div>
  )
}

export default page