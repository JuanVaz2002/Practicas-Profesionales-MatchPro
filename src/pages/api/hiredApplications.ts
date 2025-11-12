// src/pages/api/CVs.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import matchprodb from '../../server/lib/dt';
import { HiredApplication } from '../../types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  
  if (req.method === 'GET') {
    const script_applications = `SELECT * FROM matchprodb.hired_applications`;

    try{


     const [rows_hired_applications] = await matchprodb.query<any[]>(script_applications);
   //   const [rows_company_info] = await matchprodb.query<any[]>('SELECT * FROM company_info');
     
     // // Group by client ID
     const hiredApplicationMap: Record<number, any> = {};

     for (const hired_application of rows_hired_applications) {
       const rejectedApplicationID = hired_application.id
       if(!hiredApplicationMap[rejectedApplicationID]) { 
        hiredApplicationMap[rejectedApplicationID] = {
          id: rejectedApplicationID, 
          rejectedApplicationId: hired_application.rejected_application_id, 
          candidateId: hired_application.candidate_id, 
          jobId: hired_application.job_id, 
          responsedAt: hired_application.responsedAt, 
         }
       }
     }

     res.status(202).json(Object.values(hiredApplicationMap));
   } catch (error) {
     console.error('Error fetching hired application:', error);
     res.status(500).json({ error: 'Failed to fetch jobs' });
   }
 }

  res.setHeader('Allow', ['GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}