import { Avatar, Button, Typography } from 'antd';
import { GithubFilled } from '@ant-design/icons';
import { Link } from 'react-router';
import { useUserStore } from '@/stores/user.store';
import { useEffect } from 'react';
import { getUserProfile } from '@/api/user.api';

export const AppHeader = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getUserProfile();
        if (result.data) {
          setUser(result.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-between px-8 h-full">
      <div className="flex items-center gap-4">
        <Typography.Title level={4} style={{ margin: 0 }}>
          InternJob
        </Typography.Title>
        <Typography.Text type="secondary">
          AI-Powered Internship Tracker
        </Typography.Text>
      </div>
      <div className="flex gap-4 items-center">
        {user ? (
          <Avatar src={user.avatarURL} />
        ) : (
          <Button variant="solid" color="primary">
            <Link to={`${import.meta.env.VITE_BACKEND_URL}/auth/google/login`}>
              Đăng nhập
            </Link>
          </Button>
        )}
        <a
          href="https://github.com/Hades1123/InternJob"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubFilled style={{ fontSize: 20 }} />
        </a>
      </div>
    </div>
  );
};
