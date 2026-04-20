import { Typography } from 'antd';
import { GithubFilled } from '@ant-design/icons';

export const AppHeader = () => {
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
      <a
        href="https://github.com/Hades1123/InternJob"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GithubFilled style={{ fontSize: 20 }} />
      </a>
    </div>
  );
};
