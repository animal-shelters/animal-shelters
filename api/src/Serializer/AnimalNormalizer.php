<?php

namespace App\Serializer;

use App\Entity\Animal;
use App\Entity\MediaObject;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\Normalizer\ContextAwareNormalizerInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareTrait;

final class AnimalNormalizer implements ContextAwareNormalizerInterface, NormalizerAwareInterface
{
    use NormalizerAwareTrait;

    private const ALREADY_CALLED = 'ANIMAL_NORMALIZER_ALREADY_CALLED';

    public function __construct(
        private EntityManagerInterface $em
    ) {
    }

    public function normalize(mixed $object, ?string $format = null, array $context = []): array|string|int|float|bool|\ArrayObject|null
    {
        $context[self::ALREADY_CALLED] = true;
        $mediaObject = $this->em->getRepository(MediaObject::class)->getAnimalMainImage(
            $object->getId()
        );
        $object->setHighlightedImage(
            $mediaObject ? 'media/' . $mediaObject->getFilePath() : ''
        );

        return $this->normalizer->normalize($object, $format, $context);
    }

    public function supportsNormalization($data, ?string $format = null, array $context = []): bool
    {
        if (isset($context[self::ALREADY_CALLED])) {
            return false;
        }

        return $data instanceof Animal;
    }
}
