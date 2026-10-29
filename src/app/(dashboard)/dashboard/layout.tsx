import React, { ReactNode } from 'react';
import Sidebar from './_components/Sidbar';

const layout = ({ children }: { children: ReactNode }) => {
    return (
      <div className="flex min-h-screen bg-gray-50">
   
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
    );
};

export default layout;