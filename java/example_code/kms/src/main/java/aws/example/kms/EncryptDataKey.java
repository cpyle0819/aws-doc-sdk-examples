// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

package aws.example.kms;

import com.amazonaws.services.kms.AWSKMS;
import com.amazonaws.services.kms.AWSKMSClientBuilder;
import com.amazonaws.services.kms.model.EncryptRequest;

import java.nio.ByteBuffer;

public class EncryptDataKey {
    public static void main(String[] args) {
        AWSKMS kmsClient = AWSKMSClientBuilder.standard().build();

        // Encrypt a data key
        //
        // Replace the following fictitious CMK ARN with a valid CMK ID or ARN
        String keyId = "1234abcd-12ab-34cd-56ef-1234567890ab";
        ByteBuffer plaintext = ByteBuffer.wrap(new byte[] { 1, 2, 3, 4, 5, 6, 7, 8, 9, 0 });

        EncryptRequest req = new EncryptRequest().withKeyId(keyId).withPlaintext(plaintext);
        ByteBuffer ciphertext = kmsClient.encrypt(req).getCiphertextBlob();
    }
}
