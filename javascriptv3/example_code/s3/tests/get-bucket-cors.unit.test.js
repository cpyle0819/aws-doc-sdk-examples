// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { S3ServiceException } from "@aws-sdk/client-s3";
import { describe, it, expect, vi } from "vitest";

const send = vi.fn();

vi.doMock("@aws-sdk/client-s3", async () => {
  const actual = await vi.importActual("@aws-sdk/client-s3");
  return {
    ...actual,
    S3Client: class {
      send = send;
    },
  };
});

const { main } = await import("../actions/get-bucket-cors.js");

describe("get-bucket-cors", () => {
  it("should log the response from the service", async () => {
    send.mockResolvedValue({
      CORSRules: [
        {
          AllowedHeaders: ["foo"],
          AllowedMethods: ["bar"],
          AllowedOrigins: ["baz"],
          ExposeHeaders: ["qux"],
          MaxAgeSeconds: 123,
        },
      ],
    });

    const spy = vi.spyOn(console, "log");

    await main({ bucketName: "amzn-s3-demo-bucket" });

    expect(spy).toHaveBeenCalledWith(
      "\nCORSRule 1",
      `\n${"-".repeat(10)}`,
      "\nAllowedHeaders: foo",
      "\nAllowedMethods: bar",
      "\nAllowedOrigins: baz",
      "\nExposeHeaders: qux",
      "\nMaxAgeSeconds: 123",
    );
  });

  it("should log a relevant error when the bucket doesn't exist", async () => {
    const error = new S3ServiceException("The specified bucket does not exist");
    error.$fault = "server"; // Workaround until PR is released. https://code.amazon.com/reviews/CR-171722725/revisions/1#/reviewers
    error.$metadata = "metadata"; // Workaround until PR is released. https://code.amazon.com/reviews/CR-171722725/revisions/1#/reviewers
    error.name = "NoSuchBucket";
    const bucketName = "amzn-s3-demo-bucket";
    send.mockRejectedValueOnce(error);

    const spy = vi.spyOn(console, "error");

    await main({ bucketName });

    expect(spy).toHaveBeenCalledWith(
      `Error from S3 while getting bucket CORS rules for ${bucketName}. The bucket doesn't exist.`,
    );
  });

  it("should indicate a failure came from S3 when the error isn't generic", async () => {
    const error = new S3ServiceException("Some S3 service exception.");
    error.$fault = "server"; // Workaround until PR is released. https://code.amazon.com/reviews/CR-171722725/revisions/1#/reviewers
    error.$metadata = "metadata"; // Workaround until PR is released. https://code.amazon.com/reviews/CR-171722725/revisions/1#/reviewers
    error.name = "ServiceException";
    const bucketName = "amzn-s3-demo-bucket";
    send.mockRejectedValueOnce(error);

    const spy = vi.spyOn(console, "error");

    await main({ bucketName });

    expect(spy).toHaveBeenCalledWith(
      `Error from S3 while getting bucket CORS rules for ${bucketName}.  ${error.name}: ${error.message}`,
    );
  });

  it("should throw errors that are not S3 specific", async () => {
    const bucketName = "amzn-s3-demo-bucket";
    send.mockRejectedValueOnce(new Error());

    await expect(() => main({ bucketName })).rejects.toBeTruthy();
  });
});
