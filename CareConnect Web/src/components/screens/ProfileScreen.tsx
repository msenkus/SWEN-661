import { Edit2, Phone, Mail, MapPin, Calendar, Activity, HeartPulse, Droplets, ShieldAlert, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { useNavigate } from 'react-router';
import { useAuthStore } from '../../store/authStore';

export function ProfileScreen() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const patientData = {
    name: user?.name || 'Eleanor Rodriguez',
    email: user?.email || 'eleanor.r@email.com',
    age: 72,
    medicalInfo: {
      bloodType: 'O+',
      conditions: ['Type 2 Diabetes', 'Hypertension', 'Arthritis'],
      allergies: ['Penicillin', 'Sulfa drugs'],
    },
    emergencyContact: {
      name: 'Mary Johnson',
      relationship: 'Daughter',
      phone: '(555) 234-5678',
    },
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4 md:space-y-6 max-w-4xl mx-auto">
      
      {/* Profile Header */}
      <Card className="overflow-hidden border-none shadow-md">
        <div className="bg-blue-600 h-20 md:h-24"></div>
        <div className="px-4 md:px-6 pb-6 -mt-12 flex flex-col items-center sm:items-start sm:flex-row sm:gap-6">
          <Avatar className="w-20 h-20 md:w-24 md:h-24 border-4 border-white shadow-lg">
            <AvatarImage src="https://images.unsplash.com/photo-1617216939864-e5f02a2a545d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGRlcmx5JTIwaGFwcHklMjB3b21hbiUyMHByb2ZpbGUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njk5OTA4NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" alt="Profile" />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
          <div className="mt-4 sm:mt-12 text-center sm:text-left flex-1">
            <h2 className="text-xl md:text-2xl font-bold text-slate-800">{patientData.name}</h2>
            <p className="text-sm md:text-base text-slate-500 font-medium">Patient ID: #8839210</p>
          </div>
          <div className="mt-4 sm:mt-12">
            <Button variant="outline" className="gap-2 border-blue-200 text-blue-700 hover:bg-blue-50 text-sm md:text-base">
              <Edit2 size={16} />
              Edit Profile
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
        {/* Vital Information */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-base md:text-lg flex items-center gap-2 text-slate-700">
              <Activity className="text-blue-500 w-5 h-5" />
              Vital Information
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <div className="text-sm text-slate-500 mb-1 flex items-center justify-center gap-1">
                <Droplets size={14} /> Blood Type
              </div>
              <div className="text-lg md:text-xl font-bold text-blue-700">{patientData.medicalInfo.bloodType}</div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg text-center">
              <div className="text-sm text-slate-500 mb-1">Age</div>
              <div className="text-lg md:text-xl font-bold text-green-700">{patientData.age}</div>
            </div>
          </CardContent>
        </Card>

        {/* Medical Conditions */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-base md:text-lg flex items-center gap-2 text-slate-700">
              <HeartPulse className="text-red-500 w-5 h-5" />
              Medical Conditions
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-3">
              {patientData.medicalInfo.conditions.map((condition, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 rounded-full bg-red-400 shrink-0" />
                  <span className="text-sm md:text-base text-slate-700 font-medium">{condition}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Allergies & Emergency Contact */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-base md:text-lg flex items-center gap-2 text-slate-700">
              <ShieldAlert className="text-orange-500 w-5 h-5" />
              Allergies & Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex flex-wrap gap-2">
              {patientData.medicalInfo.allergies.map((allergy, index) => (
                <Badge key={index} variant="destructive" className="px-3 py-1 text-sm md:text-base font-normal">
                  {allergy}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-base md:text-lg flex items-center gap-2 text-slate-700">
              <Phone className="text-green-500 w-5 h-5" />
              Emergency Contacts
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div>
                <div className="text-sm md:text-base font-bold text-slate-800">{patientData.emergencyContact.name}</div>
                <div className="text-xs md:text-sm text-slate-500">{patientData.emergencyContact.relationship}</div>
              </div>
              <Button size="icon" className="bg-green-600 hover:bg-green-700 rounded-full h-9 w-9 md:h-10 md:w-10">
                <Phone size={16} className="md:w-[18px] md:h-[18px]" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="pt-4 pb-8">
        <Button 
          variant="destructive" 
          className="w-full py-5 md:py-6 text-base md:text-lg font-bold rounded-xl shadow-sm"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 w-5 h-5" />
          Sign Out
        </Button>
      </div>

    </div>
  );
}