import { userRepository } from '@/backend/repositories'

/**
 * User Service - Business logic for user operations
 */
export const userService = {
  /**
   * Get a user by ID
   */
  async getById(id: string) {
    return userRepository.findById(id)
  },

  /**
   * Get a user by username
   */
  async getByUsername(username: string) {
    return userRepository.findByUsername(username)
  },

  /**
   * Get all registered users
   */
  async getAllUsers() {
    return userRepository.findAll()
  },

  /**
   * Update user profile
   */
  async updateProfile(id: string, data: { name?: string; email?: string }) {
    // If email is being updated, check if it's already taken
    if (data.email) {
      const existingUser = await userRepository.findByEmail(data.email)
      if (existingUser && existingUser.id !== id) {
        throw new Error('Email is already in use')
      }
    }

    return userRepository.update(id, data)
  }
}

