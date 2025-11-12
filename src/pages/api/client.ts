import type { NextApiRequest, NextApiResponse } from 'next';
import matchprodb from '../../server/lib/dt';

const script_clients = `SELECT * FROM matchprodb.clients`;
const script_client_activities = `SELECT * FROM matchprodb.client_activities`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const [rows_clients] = await matchprodb.query<any[]>(script_clients);
  const [rows_client_activities] = await matchprodb.query<any[]>(script_client_activities);

   // Group by client ID
  const clientsMap: Record<number, any> = {};
  
  for (const client of rows_clients) {
    const clientId = client.id;
    if (!clientsMap[clientId]) {
        clientsMap[clientId] = {
          id: client.id,
          name: client.name,
          industry: client.industry,
          size: client.size,
          location: client.location,
          contactPerson: client.contact_person,
          email: client.email,
          phone: client.phone,
          status: client.status,
          joinedDate: client.joinedDate,
          activeJobs: Number(client.activeJobs),
          totalHires: Number(client.totalHires),
          revenue: Number(client.revenue),
          logo: client.logo,
          description: client.description,
          recentActivity: []
        };
      }
    }

    for (const client_activity of rows_client_activities) {
        const clientId = client_activity.client_id;
        clientsMap[clientId].recentActivity.push({
            type: client_activity.type,
            description: client_activity.description,
            date: client_activity.activity_date
        });

    }


    const clients = Object.values(clientsMap);
    res.status(200).json(clients);
}