import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { FaCamera, FaEnvelope, FaSignature, FaUser } from 'react-icons/fa6';


import styles from './ProfileIdentityCard.module.scss';
import { GlassPanel } from '@/components/atoms/GlassPanel';
import { TextInputField } from '@/components/atoms/TextInputField';
import Typography from '@mui/material/Typography';
import { ProfileFormState } from '@/types';

interface ProfileIdentityCardProps {
  form: ProfileFormState;
  onChange: (field: keyof ProfileFormState, value: string) => void;
  isEditing?: boolean;
}

export function ProfileIdentityCard({ form, onChange, isEditing = false }: ProfileIdentityCardProps) {
  return (
    <GlassPanel className={styles.card}>
      <Box className={styles.avatarBox}>
        <Avatar className={styles.avatar}>
          <FaUser />
        </Avatar>
        {isEditing && (
          <div className={styles.camera}>
            <FaCamera />
          </div>
        )}
      </Box>

      <div className={styles.fields}>
        {isEditing ? (
          <>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextInputField
                label="First Name"
                icon={<FaSignature className={styles.icon} />}
                value={form.firstName}
                onChange={(value) => onChange('firstName', value)}
                placeholder="First Name"
              />
              <TextInputField
                label="Last Name"
                icon={<FaSignature className={styles.icon} />}
                value={form.lastName}
                onChange={(value) => onChange('lastName', value)}
                placeholder="Last Name"
              />
            </Box>
            <TextInputField
              label="Email Address"
              icon={<FaEnvelope className={styles.icon} />}
              type="email"
              value={form.email}
              onChange={(value) => onChange('email', value)}
              placeholder="name@example.com"
            />
          </>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, justifyContent: 'center', height: '100%' }}>
            <Typography variant="h6" fontWeight="bold">
              {form.firstName} {form.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FaEnvelope /> {form.email || 'No email set'}
            </Typography>
          </Box>
        )}
      </div>
    </GlassPanel>
  );
}

export default ProfileIdentityCard;
