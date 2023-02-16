<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\User;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserPostProcessor implements ProcessorInterface
{
    public function __construct(
        private ProcessorInterface $decorated,
        private UserPasswordHasherInterface $userPasswordHasher
    ) {
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = [])
    {
        $this->hashPassword($data);
        $this->updateRoles($data);
        $this->decorated->process($data, $operation, $uriVariables, $context);

        return $data;
    }

    private function hashPassword(User $user): void
    {
        if ($user->getPlainPassword()) {
            $user->setPassword(
                $this->userPasswordHasher->hashPassword($user, $user->getPlainPassword())
            );
            $user->eraseCredentials();
        }
    }

    private function updateRoles(User $user): void
    {
        $user->setRoles(["ROLE_USER"]);
    }
}
