import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Plus, Edit, Trash2, User, Home, Calendar, Link } from 'lucide-react';
import { Guest, Property } from '../types';

const AdminPage: React.FC = () => {
  // Mock data
  const [guests, setGuests] = useState<Guest[]>([
    {
      id: '1',
      name: 'Alex Johnson',
      email: 'alex@example.com',
      tripStart: new Date('2025-06-15'),
      tripEnd: new Date('2025-06-20'),
      preferences: ['Food', 'Jazz'],
      guestSlug: 'alex-johnson',
      propertyId: '1'
    },
    {
      id: '2',
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      tripStart: new Date('2025-07-10'),
      tripEnd: new Date('2025-07-17'),
      preferences: ['Art', 'Architecture'],
      guestSlug: 'sarah-williams',
      propertyId: '2'
    }
  ]);
  
  const [properties, setProperties] = useState<Property[]>([
    {
      id: '1',
      name: 'Skylit Boho Retreat',
      address: '1545 W Wabansia, Chicago, IL 60622',
      checkinInfo: 'Keypad entry. Code will be sent before arrival.',
      doorCode: '4422#',
      standardNotes: 'Parking available on side streets with permit (provided).'
    },
    {
      id: '2',
      name: 'Wicker Park Condo',
      address: '1800 W Division St, Chicago, IL 60622',
      checkinInfo: 'Lockbox on front porch. Code: 9876',
      doorCode: '5544#',
      standardNotes: 'Please be mindful of noise after 10pm.'
    }
  ]);
  
  const [activeTab, setActiveTab] = useState<'guests' | 'properties'>('guests');
  
  // Format date for display
  const formatDate = (date: Date | null) => {
    if (!date) return 'N/A';
    return date.toLocaleDateString();
  };
  
  // Generate a shareable link
  const generateShareableLink = (guestSlug: string) => {
    return `https://chicago-concierge.com/guest/${guestSlug}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Chicago Concierge Admin</h1>
          <p className="text-gray-600">Manage your properties and guests</p>
        </header>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                className={`py-4 px-6 font-medium text-sm border-b-2 ${
                  activeTab === 'guests'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('guests')}
              >
                <User className="inline h-4 w-4 mr-2" />
                Guests
              </button>
              <button
                className={`py-4 px-6 font-medium text-sm border-b-2 ${
                  activeTab === 'properties'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('properties')}
              >
                <Home className="inline h-4 w-4 mr-2" />
                Properties
              </button>
            </nav>
          </div>
          
          <div className="p-4 md:p-6">
            {activeTab === 'guests' ? (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Guest Management</h2>
                  <Button variant="primary" size="sm">
                    <Plus className="h-4 w-4 mr-1" /> Add Guest
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Guest
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Property
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Trip Dates
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Share Link
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {guests.map(guest => {
                        const property = properties.find(p => p.id === guest.propertyId);
                        return (
                          <tr key={guest.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {guest.name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {guest.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{property?.name || 'N/A'}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {formatDate(guest.tripStart)} - {formatDate(guest.tripEnd)}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Button variant="outline" size="sm">
                                <Link className="h-4 w-4 mr-1" /> Copy Link
                              </Button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button className="text-blue-600 hover:text-blue-800 mr-3">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="text-red-500 hover:text-red-700">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Property Management</h2>
                  <Button variant="primary" size="sm">
                    <Plus className="h-4 w-4 mr-1" /> Add Property
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {properties.map(property => (
                    <Card key={property.id} className="border border-gray-200">
                      <CardHeader className="flex justify-between items-start p-4">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{property.name}</h3>
                          <p className="text-sm text-gray-500">{property.address}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-red-500 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="mt-2">
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Door Code:</span> {property.doorCode}
                          </p>
                          <p className="text-sm text-gray-700 mt-1">
                            <span className="font-medium">Check-in Info:</span> {property.checkinInfo}
                          </p>
                          <p className="text-sm text-gray-700 mt-1">
                            <span className="font-medium">Notes:</span> {property.standardNotes}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;