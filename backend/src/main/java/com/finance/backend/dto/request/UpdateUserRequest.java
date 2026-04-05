package com.finance.backend.dto.request;

import com.finance.backend.model.Role;
import com.finance.backend.model.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for updating an existing user.
 * Only role and status can be changed (not username/email/password).
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserRequest {

    private Role role;

    private UserStatus status;
}
