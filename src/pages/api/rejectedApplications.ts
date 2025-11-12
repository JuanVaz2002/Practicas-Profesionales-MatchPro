// src/pages/api/CVs.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import matchprodb from '../../server/lib/dt';
import { RejectedApplication } from '../../types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  
  if (req.method === 'GET') {
    const script_applications = `SELECT * FROM matchprodb.rejected_applications`;

    try{


     const [rows_rejected_applications] = await matchprodb.query<any[]>(script_applications);
   //   const [rows_company_info] = await matchprodb.query<any[]>('SELECT * FROM company_info');
     
     // // Group by client ID
     const rejectedApplicationMap: Record<number, any> = {};

     for (const rejected_application of rows_rejected_applications) {
       const rejectedApplicationID = rejected_application.id
       if(!rejectedApplicationMap[rejectedApplicationID]) { 
        rejectedApplicationMap[rejectedApplicationID] = {
          id: rejectedApplicationID, 
          rejectedApplicationId: rejected_application.rejected_application_id, 
          candidateId: rejected_application.candidate_id, 
          jobId: rejected_application.job_id, 
          reason: rejected_application.reason, 
          responsedAt: rejected_application.responsedAt, 
          comentario: rejected_application.comentario
         }
       }
     }

     res.status(202).json(Object.values(rejectedApplicationMap));
   } catch (error) {
     console.error('Error fetching jobs:', error);
     res.status(500).json({ error: 'Failed to fetch jobs' });
   }
 }

  res.setHeader('Allow', ['GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}