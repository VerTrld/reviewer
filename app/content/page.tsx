// pages/content.tsx
import { GetServerSideProps } from "next";
import { Text } from "@mantine/core";
import axios from "axios";

interface Review {
  id: string;
  username: string;
  content: string;
}

interface ContentProps {
  reviews: Review[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id as string;

  try {
    const { data } = await axios.get<{ reviews: Review[] }>("/api/user");
    const filteredReviews = data.reviews.filter((review) => review.id === id);

    return {
      props: {
        reviews: filteredReviews,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        reviews: [],
      },
    };
  }
};

export default function Content({ reviews }: ContentProps) {
  if (reviews.length === 0) {
    return <div>No reviews found</div>;
  }

  return (
    <>
      {reviews.map((review, index) => (
        <Text key={index}>
          {<div dangerouslySetInnerHTML={{ __html: review.content }} />}
        </Text>
      ))}
    </>
  );
}
