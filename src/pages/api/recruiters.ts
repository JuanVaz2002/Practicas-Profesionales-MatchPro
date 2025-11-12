import type { NextApiRequest, NextApiResponse } from 'next';
import matchprodb from '../../server/lib/dt';
const DEFAULT_AVATAR = '/placeholder-user.jpg';

const script_recruiter = `SELECT * FROM matchprodb.recruiters`;
const script_education = `SELECT * FROM matchprodb.education_recruiter`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const [rows_recruiter] = await matchprodb.query<any[]>(script_recruiter);
        const [rows_education] = await matchprodb.query<any[]>(script_education);




        // Group by client ID
        const recruitersMap: Record<number, any> = {};
        for (const recruiter of rows_recruiter) {

            const recruiterId = recruiter.id;
            
            let requirements = [];
            
            try {
                requirements = recruiter.requirements ? JSON.parse(recruiter.requirements) : [];
            } catch (error) {
                console.warn(`Failed to parse requirements (${recruiter.name}):`, error);
                requirements = [];
            }
            
            let companyTypes = [];

            try {
                companyTypes = recruiter.companyTypes ? JSON.parse(recruiter.companyTypes) : [];
            } catch (error) {
                console.warn(`Failed to parse types of company (${recruiter.name}):`, error);
                companyTypes = [];
            }
            
            if (!recruitersMap[recruiterId]) {
                recruitersMap[recruiterId] = {
                    id: recruiterId,
                    email: recruiter.email,
                    password: recruiter.password,
                    name: recruiter.name,
                    avatar: recruiter.avatar || DEFAULT_AVATAR,
                    createdAt: recruiter.createdAt,
                    bio: recruiter.bio,
                    role: "recruiter",
                    location: recruiter.location,
                    phone: recruiter.phone,
                    education: [],
                    company: recruiter.company,
                    industry: recruiter.industry,
                    companySize: `${recruiter.companySizeMin}-${recruiter.companySizeMax} employees`,
                    address: recruiter.address,
                    foundedYear: recruiter.foundedYear,
                    companyDescription: recruiter.companyDescription,
                    employerRole: recruiter.employerRole,
                    requirements: requirements,
                    companyTypes: companyTypes,
                    companyLocation: recruiter.companyLocation
                };
            
            }
            

            for (const education of rows_education) {
                if (education.user_id === recruiterId) {
                    recruitersMap[recruiterId].education.push({
                        degree: education.degree,
                        school: education.school,
                        year: education.year,
                        gpa: education.gpa
                    });
                }
            }    
            // console.log(recruitersMap[recruiterId]) //  Debugging
        }

        const recruiters = Object.values(recruitersMap);
        res.status(200).json(recruiters);
    }
}