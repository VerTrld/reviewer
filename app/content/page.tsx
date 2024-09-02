"use client";

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

export default function Content() {
  const searchparams = useSearchParams();
  const id = searchparams.get("id");
  const { data, error, isLoading } = useQuery({
    queryKey: ["id", id],
    queryFn: async () => {
      const { data } = await axios.get<Review>("/api/user");
      return data.reviews.filter((review) => review.id === id);
    },
  });

  console.log({ data });

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
