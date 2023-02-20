<?php

namespace App\Command;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[AsCommand(
    name: 'app:create-admin'
)]
class CreateAdminCommand extends Command
{
    public function __construct(
        private EntityManagerInterface $em,
        private UserPasswordHasherInterface $userPasswordHasher,
        private string $devPassword,
        private string $devEmail
    ) {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $user = $this->em->getRepository(User::class)->findBy(['email' => $this->devEmail]);
        if (!$user) {
            $user = new User();
            if (!$this->devEmail || !$this->devPassword) {
                throw new Exception('Email and password must not be empty!');
            }
            $user->setEmail($this->devEmail);
            $user->setPassword(
                $this->userPasswordHasher->hashPassword($user, $this->devPassword)
            );
            $user->setRoles(['ROLE_ADMIN']);
            $this->em->persist($user);
            $this->em->flush();
            $output->writeln('Admin added succesfully');
        }
        else {
            $output->writeln('Admin already in database');
        }
        return Command::SUCCESS;
    }
}
