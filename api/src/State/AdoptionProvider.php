<?php

namespace App\State;

use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Entity\Adoption;
use Doctrine\ORM\EntityManagerInterface;

class AdoptionProvider implements ProviderInterface
{
    public function __construct(
        private EntityManagerInterface $em
    ) {
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        list($user, $animal) = explode('-', $uriVariables['id']);
        $adoption = $this->em->getRepository(Adoption::class)->findBy(['animal' => $animal, 'user' => $user]);
        $adoption = $operation instanceof Get ? $adoption : $adoption[0];
        return $adoption;
    }
}
