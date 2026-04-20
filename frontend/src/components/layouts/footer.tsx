import { Typography, Space } from 'antd';
import { HeartFilled } from '@ant-design/icons';

export const AppFooter = () => {
  return (
    <div className="py-4">
      <Space separator={<Typography.Text type="secondary">|</Typography.Text>}>
        <Typography.Text type="secondary">
          Made with <HeartFilled style={{ color: '#ff4d4f' }} /> by Hades1123
        </Typography.Text>
        <Typography.Text type="secondary">
          Built with React + NestJS + Claude Code
        </Typography.Text>
        <Typography.Link
          href="https://github.com/Hades1123/InternJob"
          target="_blank"
        >
          GitHub
        </Typography.Link>
      </Space>
    </div>
  );
};
