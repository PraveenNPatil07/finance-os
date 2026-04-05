import { useState, useEffect } from 'react';
import { Shield, ShieldAlert, ShieldCheck, MailPlus, Trash2, PowerOff } from 'lucide-react';
import toast from 'react-hot-toast';
import userApi from '../api/userApi';
import useAuthStore from '../store/authStore';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Table from '../components/ui/Table';
import Card from '../components/ui/Card';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user: currentUser } = useAuthStore();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const res = await userApi.getAll();
      setUsers(res?.content || res || []);
    } catch (error) {
      console.error('Failed to fetch users', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddUser = async () => {
    const email = window.prompt("Enter new user's email:");
    if (!email) return;
    const username = email.split('@')[0];
    const roleChoice = window.prompt("Enter role (VIEWER or ANALYST):", "VIEWER");
    if (!roleChoice) return;
    
    try {
      setIsLoading(true);
      await userApi.create({ 
        email, 
        username, 
        password: 'password123', 
        role: roleChoice.toUpperCase(),
        status: 'ACTIVE'
      });
      toast.success('User added successfully');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to add user');
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    const confirmation = window.confirm(
      'WARNING: This will permanently DELETE the user and all their transactions from the database! Are you absolutely sure?'
    );
    if (!confirmation) return;
    
    try {
      setIsLoading(true);
      await userApi.delete(id);
      toast.success('User permanently deleted');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to delete user');
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      setIsLoading(true);
      const newStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
      await userApi.update(id, { status: newStatus });
      toast.success(`User marked as ${newStatus}`);
      fetchUsers();
    } catch (error) {
      toast.error('Failed to update status');
      setIsLoading(false);
    }
  };

  const getInitials = (name) => name?.substring(0, 2).toUpperCase() || 'U';

  const columns = [
    {
      header: 'Member',
      accessorKey: 'username',
      cell: (row) => {
        const isCurrentUser = row.id === currentUser?.id;
        let avatarBg = 'bg-surface2 text-muted';
        if (row.role === 'ADMIN') avatarBg = 'bg-brand-gradient text-white shadow-glow-sm';
        if (row.role === 'ANALYST') avatarBg = 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
        
        return (
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm shrink-0 ${avatarBg}`}>
              {getInitials(row.username)}
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-primary flex items-center gap-2 font-display">
                {row.username} 
                {isCurrentUser && <span className="text-[10px] bg-brand-dim text-brand px-1.5 py-0.5 rounded font-sans uppercase tracking-wider font-bold">You</span>}
              </span>
              <span className="text-xs text-muted">{row.email}</span>
            </div>
          </div>
        );
      }
    },
    {
      header: 'Role',
      accessorKey: 'role',
      cell: (row) => <Badge variant={row.role.toLowerCase()}>{row.role}</Badge>
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (row) => (
        <Badge variant={row.status === 'ACTIVE' ? 'active' : 'inactive'}>
          {row.status === 'ACTIVE' ? 'Active' : 'Inactive'}
        </Badge>
      )
    },
    {
       header: 'Joined',
       accessorKey: 'createdAt',
       cell: (row) => <span className="text-secondary">{new Date(row.createdAt).toLocaleDateString()}</span>
    },
    {
      header: '',
      id: 'actions',
      cell: (row) => {
        if (currentUser?.role !== 'ADMIN' || row.id === currentUser?.id || row.role === 'ADMIN') return null;
        return (
          <div className="flex items-center justify-end gap-2">
            <button 
              onClick={() => handleToggleStatus(row.id, row.status)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors focus:outline-none ${
                row.status === 'ACTIVE' 
                  ? 'text-warning hover:bg-warning/10 hover:text-yellow-500' 
                  : 'text-income hover:bg-income/10 hover:text-green-400'
              }`}
              title={row.status === 'ACTIVE' ? 'Deactivate User' : 'Activate User'}
            >
              <PowerOff size={16} />
            </button>
            <button 
              onClick={() => handleDeleteUser(row.id)}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-expense hover:bg-expense/10 hover:text-red-400 transition-colors focus:outline-none"
              title="Permanently Delete User"
            >
              <Trash2 size={16} />
            </button>
          </div>
        );
      }
    }
  ];

  // Stats computation
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'ACTIVE').length;
  const admins = users.filter(u => u.role === 'ADMIN').length;

  return (
    <div className="flex flex-col pb-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-2xl font-semibold font-display text-primary tracking-tight">Team Members</h1>
          <p className="text-sm text-secondary mt-1">Manage users, roles, and access controls.</p>
        </div>
        {currentUser?.role === 'ADMIN' && (
          <Button className="shrink-0" onClick={handleAddUser}>
            <MailPlus size={16} className="mr-2" /> Invite User
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
         <Card className="flex items-center gap-4 py-5 border-dashed bg-surface2/30">
            <div className="w-10 h-10 rounded-full bg-surface2 flex items-center justify-center text-muted">
               <Shield size={20} />
            </div>
            <div>
               <p className="text-xs uppercase tracking-widest font-semibold text-muted mb-1">Total Members</p>
               <p className="text-xl font-mono font-semibold text-primary">{isLoading ? '-' : totalUsers}</p>
            </div>
         </Card>
         <Card className="flex items-center gap-4 py-5 border-dashed bg-surface2/30">
            <div className="w-10 h-10 rounded-full bg-income-dim text-income flex items-center justify-center">
               <ShieldCheck size={20} />
            </div>
            <div>
               <p className="text-xs uppercase tracking-widest font-semibold text-muted mb-1">Active</p>
               <p className="text-xl font-mono font-semibold text-primary">{isLoading ? '-' : activeUsers}</p>
            </div>
         </Card>
         <Card className="flex items-center gap-4 py-5 border-dashed bg-surface2/30">
            <div className="w-10 h-10 rounded-full bg-brand-dim text-brand flex items-center justify-center">
               <ShieldAlert size={20} />
            </div>
            <div>
               <p className="text-xs uppercase tracking-widest font-semibold text-muted mb-1">Admins</p>
               <p className="text-xl font-mono font-semibold text-primary">{isLoading ? '-' : admins}</p>
            </div>
         </Card>
      </div>

      <div className="shadow-sm">
        <Table 
          columns={columns}
          data={users}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
