import { Button, Typography } from "antd";
import { Link, useRouteError } from "react-router";
const ErrorPage = () => {
  const error = useRouteError();

  const { Title, Paragraph } = Typography;

  return (
    <Typography style={{ textAlign: "center", padding: "50px" }}>
      <Title level={1}>Oops! Something went wrong 😢</Title>
      <Paragraph>
        {error?.statusText || error?.message || "An unexpected error occurred."}
      </Paragraph>
      <Button type="primary">
        <Link to="/">Go Back Home</Link>
      </Button>
    </Typography>
  );
};

export default ErrorPage;
