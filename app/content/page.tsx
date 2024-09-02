"use client";

import { Suspense } from "react";
import { Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";

interface Review {
  reviews: [
    {
      id: string;
      username: string;
      content: string;
    }
  ];
}

function Content() {
  const searchparams = useSearchParams();
  const id = searchparams.get("id");
  const { data, error, isLoading } = useQuery({
    queryKey: ["id", id],
    queryFn: async () => {
      const { data } = await axios.get<Review>("/api/user");
      return data.reviews.filter((review) => review.id === id);
    },
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <>
      {data?.map((review, index) => (
        <Text key={index}>
          <div dangerouslySetInnerHTML={{ __html: review.content }} />
        </Text>
      ))}
    </>
  );
}

export default function ContentWrapper() {
  return (
    <Suspense fallback={<Text>Loading content...</Text>}>
      <Content />
    </Suspense>
  );
}
