import { diagnosis } from '@/constants/diagnosis';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/header';
import DiagnosisDetail from '@/components/diagnosis/diagnosis-index';

const DiagnosisDetails = ({ params }: { params: { id: string } }) => {


  return (
    <div>
            <DiagnosisDetail id={params.id} />
    </div>
    
  );
};

export default DiagnosisDetails;
